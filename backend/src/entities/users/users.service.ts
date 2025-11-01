import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/client';
import { AddressesService } from 'src/entities/addresses/addresses.service';
import { ContactsService } from 'src/entities/contacts/contacts.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaErrorCodes } from 'src/prisma/errorCodes.enum';
import { RoleTemplateName } from 'src/auth/roles.enum';

/**
 * NOTE: Referências:
 *
 * - [NHg30Y] {@link https://docs.nestjs.com/providers#services}
 * - [xS2IQm] {@link https://en.wikipedia.org/wiki/Database_normalization}
 * - [aR3qz2] {@link https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design#single-responsibility-principle}
 * - [F4ETgg] {@link https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design#dependency-inversion-principle}
 * - [5s0lda] {@link https://docs.nestjs.com/recipes/prisma#use-prisma-client-in-your-nestjs-services}
 * - [bASYQ0] {@link https://www.prisma.io/docs/orm/prisma-client/queries/crud}
 * - [8tG45X] {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch}
 * - [57Ziqn] {@link https://developer.mozilla.org/en-US/docs/Glossary/Exception}
 * - [fFKtS9] {@link https://www.prisma.io/docs/orm/prisma-client/queries/crud#get-record-by-id-or-unique-identifier}
 * - [7szyu4] {@link https://developer.mozilla.org/en-US/docs/Glossary/REST}
 * - [Jehubq] {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status}
 * - [zScTK3] {@link https://www.cloudflare.com/pt-br/learning/ddos/glossary/open-systems-interconnection-model-osi/}
 * - [dzINY0] {@link https://www.prisma.io/docs/orm/reference/error-reference#error-codes}
 * - [K4X3xI] {@link https://www.jwt.io/introduction}
 * - [bQMfrj] {@link https://en.wikipedia.org/wiki/Bcrypt}
 * - [Wb6m3Q] {@link https://www.prisma.io/docs/orm/prisma-client/queries/transactions#the-transaction-api}
 * - [1I7hWb] {@link https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries#create-a-single-record-and-multiple-related-records}
 *
 * ---
 *
 * Um 'Service' (Serviço) [NHg30Y], faz parte do conceito fundamental de 'Providers'
 * (Provedores) no NestJS. Lembrando que 'Provedores' são classes que podem ser injetadas como
 * dependênicas em outras classes (como controladores ou outros serviços) através do sistema
 * de injeção de dependência do NestJS [F4ETgg]. Eles são responsáveis por encapsular a lógica
 * de negócios e interagir com outras partes da aplicação, como bancos de dados, APIs externas,
 * etc.
 *
 * Abstraindo: Uma "<Entidade>Service" é uma classe que gerencia as operações relacionadas
 * a uma entidade específica, encapsulando a lógica de negócios e interagindo com o banco de
 * dados (que já detém os recursos para manipular essa tabela e correlacionadas) através
 * do Prisma Client, também sendo responsável pela análise e retorno de erros (Princípio
 * da Responsabilidade Única - SRP [aR3qz2]).
 *
 * Nesse caso serviço UsersService é responsável por gerenciar as operações relacionadas
 * à entidade 'User', incluindo a criação, atualização, ativação, desativação ("Soft Delete"),
 * busca e remoção de usuários ("Hard Delete"). Outras entidades podem ter serviços similares,
 * como 'SuppliersService', 'ProductsService', etc. Mas em geral, a regra de negócio é que vai
 * nortear a implementação de cada serviço. Ex: Um 'Supplier' não tem papéis (roles), então
 * não há essa lógica no 'SuppliersService', mesmo que embora, ambas entidades façam relação
 * com contatos e endereços (1:N; Quando da aplicação de formas normais - FNs - de banco
 * de dados [xS2IQm]).
 *
 * Ele utiliza o 'PrismaService' [5s0lda] - que por sua vez, é uma dependência injetável -
 * para interagir com o banco de dados através do Prisma Client, além de utilizar os
 * serviços 'ContactsService' e 'AddressesService' para gerenciar os contatos e endereços
 * associados aos usuários.
 */
@Injectable()
export class UsersService {
  /**
   * NOTE: O construtor abaixo utiliza o recurso de injeção de dependência do NestJS para
   * fornecer instâncias dos serviços necessários para o funcionamento do UsersService
   * [F4ETgg].
   */
  constructor(
    private readonly prisma: PrismaService,
    private readonly contactsService: ContactsService,
    private readonly addressesService: AddressesService,
  ) {}

  /**
   * NOTE: Os métodos abaixo implementam operações CRUD (Create, Read, Update, Delete)
   * para a entidade 'User', incluindo funcionalidades adicionais como ativação
   * e desativação de usuários.
   *
   * É possível notar semelhanças com a semântica utilizada por bancos de dados não
   * relacionais (NoSQL) para operações de CRUD [bASYQ0], porém, aqui estamos
   * utilizando o Prisma Client, que é um ORM (Object-Relational Mapping) que facilita
   * a interação com bancos de dados relacionais através de uma API orientada a objetos.
   *
   * O método `findAll`, por exemplo, busca todos os usuários ativos na entidade 'User',
   * incluindo seus papéis, contatos e endereços relacionados que também estão ativos.
   * Utiliza a técnica de 'try..catch' [8tG45X] para capturar e tratar erros que possam
   * ocorrer durante a execução da operação assíncrona de busca no banco de dados.
   */
  async findAll(): Promise<User[]> {
    /**
     * NOTE: A sintaxe `try..catch` [8tG45X] é um recurso fundamental aqui, pois permite
     * capturar e tratar erros que possam ocorrer durante a execução das operações em seu
     * escopo (No nosso caso, a comunicação com o banco de dados via Prisma Client, que é
     * assíncrona, e depende da 'Promise'(Promessa) de que o cliente retornará o dado
     * correto: Uma matriz de usuários - "User[]").
     * Isso é crucial para garantir que a aplicação possa lidar com falhas de forma
     * controlada, fornecendo 'feedbacks' (Tratamento de exceções [57Ziqn]) adequados ao
     * usuário ou realizando ações corretivas quando possível ou necessário.
     */
    try {
      return await this.prisma.user.findMany({
        /**
         * NOTE: É possível notar aqui, a semelhança com consultas SQL tradicionais,
         * por exemplo, o ORM, por de trás dos panos, geraria uma query similar a:
         *
         * ```sql
         * SELECT * FROM Users
         * LEFT JOIN UserRoles ON Users.id = UserRoles.userId
         * LEFT JOIN RoleTemplates ON UserRoles.roleTemplateId = RoleTemplates.id
         * LEFT JOIN UserContacts ON Users.id = UserContacts.userId
         * LEFT JOIN Contacts ON UserContacts.contactId = Contacts.id
         * LEFT JOIN UserAddresses ON Users.id = UserAddresses.userId
         * LEFT JOIN Addresses ON UserAddresses.addressId = Addresses.id
         * WHERE Users.active = true AND
         *       UserRoles.active = true AND
         *       UserContacts.active = true AND
         *       UserAddresses.active = true;
         *```
         *
         * Enquanto que, na semântica do Prisma Client, usamos a notação de objetos no JS
         * para definir as relações e condições de busca [fFKtS9].
         * O 'include' é usado para especificar quais relações devem ser carregadas
         * junto com a entidade principal 'User'. Ou seja, o objeto retornado incluirá
         * não apenas os dados do usuário, mas também os dados relacionados de papéis,
         * contatos e endereços que estão ativos, para aquele(s) usuário(s).
         */
        where: { active: true },
        include: {
          roles: true, // Antes: { include: { roleTemplate: true } }
          contacts: true, // Antes: { include: { contact: true } }
          addresses: true, // Antes: { include: { address: true } }
        },
      });
    } catch (cause) {
      /**
       * NOTE: O bloco 'catch' captura qualquer erro que ocorra dentro do bloco 'try'.
       * Dado que, a regra de negócio é tratada aqui, por convenção, é natural que
       * tenhamos que lidar com diferentes tipos de "impedimentos" que podem ocorrer
       * durante a execução da operação.
       * Como estamos trabalhando com uma API HTTP RESTful [7szyu4], é importante retornar
       * códigos de status HTTP [Jehubq] apropriados para indicar o tipo de erro que ocorreu.
       * Por exemplo, um erro de autorização resultaria em um código 401 (Unauthorized),
       * como é o caso imediato abaixo. Pois a regra de negócio, nesse caso, determina que
       * a manipulação da entidade 'User' é restrita a usuários autenticados que possuam
       * o papél de 'admin' (As regras de autorização são definidas no 'Controller'
       * (Controlador), que é por onde uma requisição HTTP é recebida e processada).
       * É como se, o 'Controller', representasse a camada de sessão/apresentação dos dados
       * (Camadas 5 e 6 do modelo OSI [zScTK3]), onde a comunicação é estabelecida e gerenciada.
       * Enquanto que o 'Service' (Serviço), poderia representar a camada de aplicação
       * (Camada 7 do modelo OSI [zScTK3]), onde a lógica de negócios é implementada,
       * executada e tratada.
       */
      if (cause instanceof UnauthorizedException) {
        throw new UnauthorizedException('Acesso não autorizado.', { cause });
      }

      /**
       * NOTE: O Prisma Cliente também possui seus próprios tipos de erros conhecidos [dzINY0].
       * Aqui, defino os erros específicos em {@link src/prisma/errorCodes.type.ts} para facilitar
       * a manutenção e reutilização do código. E o teste verifica se o erro capturado é uma
       * instância de `PrismaClientKnownRequestError`, que é um tipo específico de erro
       * lançado pelo Prisma Client quando uma operação falha devido a uma condição conhecida.
       */
      if (cause instanceof Prisma.PrismaClientKnownRequestError) {
        if (cause.code === PrismaErrorCodes.RECORD_NOT_FOUND) {
          throw new NotFoundException('Usuários não encontrados.', { cause });
        }
      }

      /**
       * NOTE: Se nenhuma das condições forem atendidas, a aplicação lança uma exceção genérica
       * de erro interno do servidor (código 500), indicando que algo inesperado
       * ocorreu durante o processamento da requisição. Cabendo ao desenvolvedor
       * investigar os logs e detalhes do erro para identificar a causa raiz do problema.
       */
      throw new InternalServerErrorException('Falha interna ao buscar usuários.', { cause });
    }
  }

  // NOTE: Mesma coisa que a função findAll, mas buscando por ID específico
  async findOne(id: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { id, active: true },
        include: {
          roles: true, // Antes: { include: { roleTemplate: true } }
          contacts: true, // Antes: { include: { contact: true } }
          addresses: true, // Antes: { include: { address: true } }
        },
      });
    } catch (cause) {
      if (cause instanceof UnauthorizedException) {
        throw new UnauthorizedException('Acesso não autorizado.', { cause });
      }

      if (cause instanceof Prisma.PrismaClientKnownRequestError) {
        if (cause.code === PrismaErrorCodes.RECORD_NOT_FOUND) {
          throw new NotFoundException(`Usuário '${id}' não encontrado.`, { cause });
        }
      }

      throw new InternalServerErrorException(`Falha interna ao buscar o usuário '${id}'.`, { cause });
    }
  }

  // NOTE: Mesma coisa que a função findOne, mas buscando por userName específico
  // usado para validação de login e autenticação (token JWT [K4X3xI])
  async findOneByUser(userName: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { userName, active: true },
        include: {
          roles: true, // Antes: { include: { roleTemplate: true } }
        },
      });
    } catch (cause) {
      if (cause instanceof UnauthorizedException) {
        throw new UnauthorizedException('Acesso não autorizado.', { cause });
      }

      if (cause instanceof Prisma.PrismaClientKnownRequestError) {
        if (cause.code === PrismaErrorCodes.RECORD_NOT_FOUND) {
          throw new NotFoundException(`Usuário '${userName}' não encontrado.`, { cause });
        }
      }

      throw new InternalServerErrorException(`Falha interna ao buscar o usuário '${userName}'.`, {
        cause,
      });
    }
  }

  // NOTE: Criar um novo usuário na entidade User, com hash de senha (utilizando a biblioteca
  // bcrypt [bQMfrj]) e criação de contatos e endereços. Retorna o usuário criado.
  async create(dto: CreateUserDto): Promise<User> {
    // let userId: string;
    try {
      const { contacts, addresses, ...userData } = dto;

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      // (DEPRECIADO em função de [1I7hWb]) Uma '$transaction' (transação), é uma forma de
      // garantir que múltiplas operações no banco de dados sejam executadas de forma
      // atômica. Ou seja, ou todas as operações são concluídas com sucesso, ou nenhuma
      // delas é aplicada, mantendo a integridade dos dados [Wb6m3Q], um erro aqui
      // implicará em "rollback" de todas as operações.
      // await this.prisma.$transaction(async (tx) => {
      //   const user = await tx.user.create({
      //     data: {
      //       ...userData,
      //       password: hashedPassword,
      //     },
      //   });
      //   const getRole = await tx.roleTemplate.findUniqueOrThrow({
      //     where: {
      //       name: RoleTemplateName.CUSTOMER, // Assumindo que dto.roles sempre terá pelo menos um papel
      //     },
      //   });
      //   await tx.userRoleTemplate.create({
      //     data: {
      //       userId: user.id,
      //       roleTemplateId: getRole.id,
      //     },
      //   });
      //   userId = user.id;
      //   if (contacts && contacts.length > 0) {
      //     await this.contactsService.createManyForUser(user.id, contacts, tx);
      //   }
      //   if (addresses && addresses.length > 0) {
      //     await this.addressesService.createManyForUser(user.id, addresses, tx);
      //   }
      // });
      // return await this.findOne(userId);

      // NOTE: Utilizando a técnica de criação de múltiplos registros relacionados
      // em uma única operação atômica [1I7hWb], simplificando o código e melhorando
      // a performance. Lembrando que, há pelo menos um contato e um endereço
      // obrigatórios para criar um usuário (validações no DTO).
      // Não precisamos mais de transação explícita para esta lógica
      const user = await this.prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword,

          roles: {
            connect: { name: RoleTemplateName.CUSTOMER }, // Conecta ao papel padrão
          },
          contacts: {
            create: contacts, // 'create' aceita o array de DTOs diretamente
          },
          addresses: {
            create: addresses, // 'create' aceita o array de DTOs diretamente
          },
        },
        include: {
          roles: true,
          contacts: true,
          addresses: true,
        },
      });

      return user;
    } catch (cause) {
      if (cause instanceof UnauthorizedException) {
        throw new UnauthorizedException('Acesso não autorizado.', { cause });
      }

      if (cause instanceof Prisma.PrismaClientKnownRequestError) {
        if (cause.code === PrismaErrorCodes.UNIQUE_CONSTRAINT_FAILED) {
          throw new ConflictException(`Usuário '${dto.userName}' já existe.`, { cause });
        }
        if (cause.code === PrismaErrorCodes.NOT_NULL_VIOLATION) {
          throw new ConflictException(`Usuário '${dto.userName}' possui dados obrigatórios não preenchidos.`, {
            cause,
          });
        }
      }

      throw new InternalServerErrorException(`Falha interna ao criar o usuário '${dto.userName}'.`, {
        cause,
      });
    }
  }

  // NOTE: Atualizar um usuário existente na entidade User, com verificação de senha atual
  // para alteração de senha, além de atualizar contatos e endereços relacionados.
  async update(id: string, dto: UpdateUserDto): Promise<User> {
    try {
      const { roles, contacts, addresses, ...userData } = dto;

      const dataToUpdate: Prisma.UserUpdateInput = { ...userData };

      return await this.prisma.$transaction(async (tx) => {
        if (userData.password && userData.newPassword) {
          // Compara a senha atual antes de atualizar
          const user = await tx.user.findUnique({ where: { id, active: true } });
          const isPasswordValid = await bcrypt.compare(userData.password, user.password);
          if (!isPasswordValid) {
            throw new UnauthorizedException('Senha atual inválida.');
          }
          const salt = await bcrypt.genSalt();
          const hashedPassword = await bcrypt.hash(userData.newPassword, salt);
          dataToUpdate.password = hashedPassword;
        } else {
          delete dataToUpdate.password;
        }

        if (roles) {
          dataToUpdate.roles = {
            set: roles.map((roleName) => ({ name: roleName })),
          };
        }

        if (contacts) {
          dataToUpdate.contacts = {
            set: [],
            create: contacts,
          };
        }

        if (addresses) {
          dataToUpdate.addresses = {
            set: [],
            create: addresses,
          };
        }

        const updatedUser = await tx.user.update({
          where: { id, active: true },
          data: dataToUpdate,
          include: {
            roles: true,
            contacts: true,
            addresses: true,
          },
        });

        return updatedUser;
      });
    } catch (cause) {
      if (cause instanceof UnauthorizedException) {
        throw new UnauthorizedException('Acesso não autorizado.', { cause });
      }

      if (cause instanceof Prisma.PrismaClientKnownRequestError) {
        if (cause.code === PrismaErrorCodes.RECORD_NOT_FOUND) {
          throw new NotFoundException(`Usuário '${id}' não encontrado.`, { cause });
        }
        if (cause.code === PrismaErrorCodes.UNIQUE_CONSTRAINT_FAILED) {
          throw new ConflictException(`Usuário com dados fornecidos já existe.`, { cause });
        }
        if (cause.code === PrismaErrorCodes.NOT_NULL_VIOLATION) {
          throw new ConflictException(`Usuário '${id}' possui dados obrigatórios não preenchidos.`, {
            cause,
          });
        }
      }

      throw new InternalServerErrorException(`Falha ao atualizar o usuário '${id}'.`, {
        cause,
      });
    }
  }

  // NOTE: Ativar um usuário (Benefício de utilizar a técnica de "Soft Delete")
  async activate(id: string): Promise<User | null> {
    try {
      return await this.prisma.user.update({
        where: { id, active: false },
        data: { active: true },
      });
    } catch (cause) {
      if (cause instanceof UnauthorizedException) {
        throw new UnauthorizedException('Acesso não autorizado.', { cause });
      }

      if (cause instanceof Prisma.PrismaClientKnownRequestError) {
        if (cause.code === PrismaErrorCodes.RECORD_NOT_FOUND) {
          throw new NotFoundException(`Usuário '${id}' não encontrado.`, { cause });
        }
      }

      throw new InternalServerErrorException(`Falha ao ativar o usuário '${id}'.`, {
        cause,
      });
    }
  }

  // NOTE: Desativar um usuário (Benefício de utilizar a técnica de "Soft Delete")
  async deactivate(id: string): Promise<User | null> {
    try {
      return await this.prisma.user.update({
        where: { id, active: true },
        data: { active: false },
      });
    } catch (cause) {
      if (cause instanceof UnauthorizedException) {
        throw new UnauthorizedException('Acesso não autorizado.', { cause });
      }

      if (cause instanceof Prisma.PrismaClientKnownRequestError) {
        if (cause.code === PrismaErrorCodes.RECORD_NOT_FOUND) {
          throw new NotFoundException(`Usuário '${id}' não encontrado.`, { cause });
        }
      }

      throw new InternalServerErrorException(`Falha ao desativar o usuário '${id}'.`, {
        cause,
      });
    }
  }

  // NOTE: Deletar um usuário permanentemente da entidade User
  // Usar com cautela, pois se trata do chamado "Hard Delete"
  async remove(id: string): Promise<User> {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (cause) {
      if (cause instanceof UnauthorizedException) {
        throw new UnauthorizedException('Acesso não autorizado.', { cause });
      }

      if (cause instanceof Prisma.PrismaClientKnownRequestError) {
        if (cause.code === PrismaErrorCodes.RECORD_NOT_FOUND) {
          throw new NotFoundException(`Usuário '${id}' não encontrado.`, { cause });
        }
      }

      throw new InternalServerErrorException(`Falha ao deletar o usuário '${id}'.`, {
        cause,
      });
    }
  }
}
