import {
  ConflictException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '../../generated/client';
import { Crud, Entity, Subject } from '../entities/crud.enum';
import { PrismaErrorCodes } from '../prisma/errorCodes.enum';

interface ErrorContext {
  entity: Entity;
  method: Crud;
  sub?: Subject | string;
  data?: any;
}

export const serviceErrorHandler = (cause: any, { entity, method, sub, data }: ErrorContext) => {
  const header = `${method} ${entity} '${sub || Subject.UNDEFINED}':`;
  new Logger('ServiceErrorHandler').error(header, cause);

  // Anexa informações adicionais ao erro original
  const errorData: ErrorContext = { entity, method, sub, data };
  cause.errorData = errorData;

  // Testa se o erro é de autorização
  if (cause instanceof UnauthorizedException) {
    throw new UnauthorizedException(`${header}': Acesso não autorizado.`, { cause });
  }

  /**
   * NOTE: O Prisma Cliente também possui seus próprios tipos de erros conhecidos [dzINY0].
   * Aqui, defino os erros específicos em {@link src/prisma/errorCodes.type.ts} para facilitar
   * a manutenção e reutilização do código. E o teste verifica se o erro capturado é uma
   * instância de `PrismaClientKnownRequestError`, que é um tipo específico de erro
   * lançado pelo Prisma Client quando uma operação falha devido a uma condição conhecida.
   */
  if (cause instanceof Prisma.PrismaClientKnownRequestError) {
    switch (cause.code) {
      case PrismaErrorCodes.UNIQUE_CONSTRAINT_FAILED:
        throw new ConflictException(`${header}': Conflito de dados.`, { cause });
      case PrismaErrorCodes.NOT_NULL_VIOLATION:
        throw new ConflictException(`${header}': Dados obrigatórios não preenchidos.`, {
          cause,
        });
      case PrismaErrorCodes.RECORD_NOT_FOUND:
        throw new NotFoundException(`${header}': Registro não encontrado.`, { cause });
    }
  }

  /**
   * NOTE: Se nenhuma das condições forem atendidas, a aplicação lança uma exceção genérica
   * de erro interno do servidor (código 500), indicando que algo inesperado
   * ocorreu durante o processamento da requisição. Cabendo ao desenvolvedor
   * investigar os logs e detalhes do erro para identificar a causa raiz do problema.
   */
  throw new InternalServerErrorException(`${header}': Erro interno do servidor.`, {
    cause,
  });
};
