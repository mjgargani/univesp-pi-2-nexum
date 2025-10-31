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
import { RoleTemplateName, UpdateUserDto } from './dto/update-user.dto';
import { PrismaErrorCodes } from 'src/prisma/errorCodes.type';

// https://docs.nestjs.com/recipes/prisma#use-prisma-client-in-your-nestjs-services

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly contactsService: ContactsService,
    private readonly addressesService: AddressesService,
  ) {}

  findAll(): Promise<User[]> {
    try {
      return this.prisma.user.findMany({
        where: { active: true },
        include: {
          roles: {
            where: { active: true },
            include: {
              roleTemplate: true,
            },
          },
          contacts: {
            where: { active: true },
            include: {
              contact: true,
            },
          },
          addresses: {
            where: { active: true },
            include: {
              address: true,
            },
          },
        },
      });
    } catch (cause) {
      if (cause instanceof UnauthorizedException) {
        throw new UnauthorizedException('Acesso não autorizado.', { cause });
      }

      if (cause instanceof Prisma.PrismaClientKnownRequestError) {
        if (cause.code === PrismaErrorCodes.RECORD_NOT_FOUND) {
          throw new NotFoundException('Usuários não encontrados.', { cause });
        }
      }

      throw new InternalServerErrorException('Falha interna ao buscar usuários.', { cause });
    }
  }

  findOne(id: string): Promise<User | null> {
    try {
      return this.prisma.user.findUnique({
        where: { id, active: true },
        include: {
          roles: {
            where: { active: true },
            include: {
              roleTemplate: true,
            },
          },
          contacts: {
            where: { active: true },
            include: {
              contact: true,
            },
          },
          addresses: {
            where: { active: true },
            include: {
              address: true,
            },
          },
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

  findOneByUser(userName: string): Promise<User | null> {
    try {
      return this.prisma.user.findUnique({
        where: { userName, active: true },
        include: {
          roles: {
            where: { active: true },
            include: {
              roleTemplate: true,
            },
          },
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

  async create(dto: CreateUserDto): Promise<User> {
    try {
      const { contacts, addresses, ...userData } = dto;

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      return await this.prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            ...userData,
            password: hashedPassword,
          },
        });

        const getRole = await tx.roleTemplate.findUniqueOrThrow({
          where: {
            name: RoleTemplateName.CUSTOMER, // Assumindo que dto.roles sempre terá pelo menos um papel
          },
        });

        await tx.userRoleTemplate.create({
          data: {
            userId: user.id,
            roleTemplateId: getRole.id,
          },
        });

        if (contacts && contacts.length > 0) {
          await this.contactsService.createManyForUser(user.id, contacts, tx);
        }

        if (addresses && addresses.length > 0) {
          await this.addressesService.createManyForUser(user.id, addresses, tx);
        }

        return user;
      });
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

        const updatedUser = await tx.user.update({
          where: { id, active: true },
          data: dataToUpdate,
        });

        if (roles !== undefined) {
          await tx.userRoleTemplate.deleteMany({
            where: { userId: id },
          });

          if (roles.length > 0) {
            for (const roleName of roles) {
              const role = await tx.roleTemplate.findUniqueOrThrow({
                where: { name: roleName },
              });

              await tx.userRoleTemplate.create({
                data: {
                  userId: id,
                  roleTemplateId: role.id,
                },
              });
            }
          }
        }

        if (contacts !== undefined) {
          await tx.userContact.deleteMany({
            where: { userId: id },
          });
          if (contacts.length > 0) {
            await this.contactsService.createManyForUser(id, contacts, tx);
          }
        }

        if (addresses !== undefined) {
          await tx.userAddress.deleteMany({
            where: { userId: id },
          });
          if (addresses.length > 0) {
            await this.addressesService.createManyForUser(id, addresses, tx);
          }
        }

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

  async activate(id: string): Promise<User | null> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        await tx.userRoleTemplate.updateMany({
          where: { userId: id, active: false },
          data: {
            active: true,
          },
        });
        await tx.userContact.updateMany({
          where: { userId: id, active: false },
          data: {
            active: true,
          },
        });
        await tx.userAddress.updateMany({
          where: { userId: id, active: false },
          data: {
            active: true,
          },
        });
        return await tx.user.update({
          where: { id, active: false },
          data: {
            active: true,
          },
        });
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

  async deactivate(id: string): Promise<User | null> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        await tx.userRoleTemplate.updateMany({
          where: { userId: id, active: true },
          data: {
            active: false,
          },
        });
        await tx.userContact.updateMany({
          where: { userId: id, active: true },
          data: {
            active: false,
          },
        });
        await tx.userAddress.updateMany({
          where: { userId: id, active: true },
          data: {
            active: false,
          },
        });
        return await tx.user.update({
          where: { id, active: true },
          data: {
            active: false,
          },
        });
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

  remove(id: string): Promise<User> {
    try {
      return this.prisma.user.delete({
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
