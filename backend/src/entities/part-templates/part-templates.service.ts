import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from 'generated/client';
import { PrismaErrorCodes } from 'src/prisma/errorCodes.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePartTemplateDto } from './dto/create-part-template.dto';
import { UpdatePartTemplateDto } from './dto/update-part-template.dto';

@Injectable()
export class PartTemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return this.prisma.partTemplate.findMany({
        include: {
          suppliers: true,
        },
      });
    } catch (cause) {
      if (cause instanceof UnauthorizedException) {
        throw new UnauthorizedException('Acesso não autorizado.', { cause });
      }

      if (cause instanceof Prisma.PrismaClientKnownRequestError) {
        if (cause.code === PrismaErrorCodes.RECORD_NOT_FOUND) {
          throw new NotFoundException('Peças não encontradas.', { cause });
        }
      }

      throw new InternalServerErrorException('Falha ao buscar peças.', {
        cause,
      });
    }
  }

  async findOne(id: string) {
    try {
      return this.prisma.partTemplate.findUnique({ where: { id }, include: { suppliers: true } });
    } catch (cause) {
      if (cause instanceof UnauthorizedException) {
        throw new UnauthorizedException('Acesso não autorizado.', { cause });
      }

      if (cause instanceof Prisma.PrismaClientKnownRequestError) {
        if (cause.code === PrismaErrorCodes.RECORD_NOT_FOUND) {
          throw new NotFoundException(`Peça '${id}' não encontrada.`, { cause });
        }
      }

      throw new InternalServerErrorException(`Falha ao buscar a peça '${id}'.`, {
        cause,
      });
    }
  }

  async create(dto: CreatePartTemplateDto) {
    try {
      const { supplierIds, ...partTemplateData } = dto;

      const partTemplate = await this.prisma.partTemplate.create({
        data: {
          ...partTemplateData,
          suppliers: {
            connect: supplierIds.map((supplierId) => ({ id: supplierId })),
          },
        },
        include: {
          suppliers: true,
        },
      });

      return partTemplate;
    } catch (cause) {
      if (cause instanceof UnauthorizedException) {
        throw new UnauthorizedException('Acesso não autorizado.', { cause });
      }

      if (cause instanceof Prisma.PrismaClientKnownRequestError) {
        if (cause.code === PrismaErrorCodes.UNIQUE_CONSTRAINT_FAILED) {
          throw new ConflictException(`Peça '${dto.name}' já existe.`, { cause });
        }
        if (cause.code === PrismaErrorCodes.NOT_NULL_VIOLATION) {
          throw new ConflictException(`Peça '${dto.name}' possui dados obrigatórios não preenchidos.`, {
            cause,
          });
        }
        if (cause.code === PrismaErrorCodes.RECORD_NOT_FOUND) {
          throw new NotFoundException(`Um ou mais fornecedores em 'supplierIds' não foram encontrados.`, { cause });
        }
      }

      throw new InternalServerErrorException('Falha ao criar a peça.', {
        cause,
      });
    }
  }

  async update(id: string, dto: UpdatePartTemplateDto) {
    try {
      const { supplierIds, ...partTemplateData } = dto;

      const dataToUpdate: Prisma.PartTemplateUpdateInput = { ...partTemplateData };

      if (supplierIds) {
        dataToUpdate.suppliers = {
          set: [],
          connect: supplierIds.map((supplierId) => ({ id: supplierId })),
        };
      }

      return this.prisma.partTemplate.update({
        where: { id },
        data: dataToUpdate,
        include: { suppliers: true },
      });
    } catch (cause) {
      if (cause instanceof UnauthorizedException) {
        throw new UnauthorizedException('Acesso não autorizado.', { cause });
      }

      if (cause instanceof Prisma.PrismaClientKnownRequestError) {
        if (cause.code === PrismaErrorCodes.RECORD_NOT_FOUND) {
          throw new NotFoundException(`Peça '${id}' não encontrada.`, { cause });
        }
        if (cause.code === PrismaErrorCodes.UNIQUE_CONSTRAINT_FAILED) {
          throw new ConflictException(`Peça com dados fornecidos já existe.`, { cause });
        }
        if (cause.code === PrismaErrorCodes.NOT_NULL_VIOLATION) {
          throw new ConflictException(`Peça '${id}' possui dados obrigatórios não preenchidos.`, {
            cause,
          });
        }
      }

      throw new InternalServerErrorException(`Falha ao atualizar o peça '${id}'.`, {
        cause,
      });
    }
  }

  async remove(id: string) {
    try {
      return this.prisma.partTemplate.delete({ where: { id } });
    } catch (cause) {
      if (cause instanceof UnauthorizedException) {
        throw new UnauthorizedException('Acesso não autorizado.', { cause });
      }

      if (cause instanceof Prisma.PrismaClientKnownRequestError) {
        if (cause.code === PrismaErrorCodes.RECORD_NOT_FOUND) {
          throw new NotFoundException(`Peça '${id}' não encontrada.`, { cause });
        }
      }

      throw new InternalServerErrorException(`Falha ao deletar a peça '${id}'.`, {
        cause,
      });
    }
  }
}
