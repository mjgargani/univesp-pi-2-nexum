import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContactsService } from '../contacts/contacts.service';
import { AddressesService } from '../addresses/addresses.service';
import { Prisma, Supplier } from 'generated/client';
import { PrismaErrorCodes } from 'src/prisma/errorCodes.enum';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

/**
 * Dado que a entidade Supplier segue a mesma linha de raciocínio da entidade User,
 * muitos dos métodos aqui implementados são similares aos da entidade UserService.
 * Lembrando que um Supplier, assim como um User, pode ter múltiplos contatos e endereços
 * associados - relação 1:N. [{@link src/entities/users/users.service.ts}].
 */
@Injectable()
export class SuppliersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly contactsService: ContactsService,
    private readonly addressesService: AddressesService,
  ) {}

  async findAll(): Promise<Supplier[]> {
    try {
      return await this.prisma.supplier.findMany({
        where: { active: true },
        include: {
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
          throw new NotFoundException('Fornecedores não encontrados.', { cause });
        }
      }

      throw new InternalServerErrorException('Falha ao buscar fornecedores.', {
        cause,
      });
    }
  }

  async findOne(id: string): Promise<Supplier | null> {
    try {
      return await this.prisma.supplier.findUnique({
        where: { id, active: true },
        include: {
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
          throw new NotFoundException(`Fornecedor '${id}' não encontrado.`, { cause });
        }
      }

      throw new InternalServerErrorException(`Falha ao buscar o fornecedor '${id}'.`, {
        cause,
      });
    }
  }

  async create(dto: CreateSupplierDto): Promise<Supplier> {
    let supplierId: string;
    try {
      const { contacts, addresses, ...supplierData } = dto;

      await this.prisma.$transaction(async (tx) => {
        const supplier = await tx.supplier.create({ data: supplierData });
        supplierId = supplier.id;

        if (contacts && contacts.length > 0) {
          await this.contactsService.createManyForSupplier(supplier.id, contacts, tx);
        }

        if (addresses && addresses.length > 0) {
          await this.addressesService.createManyForSupplier(supplier.id, addresses, tx);
        }
      });

      return await this.findOne(supplierId);
    } catch (cause) {
      if (cause instanceof UnauthorizedException) {
        throw new UnauthorizedException('Acesso não autorizado.', { cause });
      }

      if (cause instanceof Prisma.PrismaClientKnownRequestError) {
        if (cause.code === PrismaErrorCodes.UNIQUE_CONSTRAINT_FAILED) {
          throw new ConflictException(`Fornecedor '${dto.companyName}' já existe.`, { cause });
        }
        if (cause.code === PrismaErrorCodes.NOT_NULL_VIOLATION) {
          throw new ConflictException(`Fornecedor '${dto.companyName}' possui dados obrigatórios não preenchidos.`, {
            cause,
          });
        }
      }

      throw new InternalServerErrorException('Falha ao criar o fornecedor.', {
        cause,
      });
    }
  }

  async update(id: string, dto: UpdateSupplierDto): Promise<Supplier> {
    let supplierId: string;
    try {
      const { contacts, addresses, ...supplierData } = dto;

      const dataToUpdate: Prisma.SupplierUpdateInput = { ...supplierData };

      await this.prisma.$transaction(async (tx) => {
        const updatedSupplier = await tx.supplier.update({
          where: { id, active: true },
          data: dataToUpdate,
        });
        supplierId = updatedSupplier.id;

        if (contacts !== undefined) {
          await tx.supplierContact.deleteMany({
            where: { supplierId: id },
          });
          if (contacts.length > 0) {
            await this.contactsService.createManyForSupplier(id, contacts, tx);
          }
        }

        if (addresses !== undefined) {
          await tx.supplierAddress.deleteMany({
            where: { supplierId: id },
          });
          if (addresses.length > 0) {
            await this.addressesService.createManyForSupplier(id, addresses, tx);
          }
        }
      });

      return await this.findOne(supplierId);
    } catch (cause) {
      if (cause instanceof UnauthorizedException) {
        throw new UnauthorizedException('Acesso não autorizado.', { cause });
      }

      if (cause instanceof Prisma.PrismaClientKnownRequestError) {
        if (cause.code === PrismaErrorCodes.RECORD_NOT_FOUND) {
          throw new NotFoundException(`Fornecedor '${id}' não encontrado.`, { cause });
        }
        if (cause.code === PrismaErrorCodes.UNIQUE_CONSTRAINT_FAILED) {
          throw new ConflictException(`Fornecedor com dados fornecidos já existe.`, { cause });
        }
        if (cause.code === PrismaErrorCodes.NOT_NULL_VIOLATION) {
          throw new ConflictException(`Fornecedor '${id}' possui dados obrigatórios não preenchidos.`, {
            cause,
          });
        }
      }

      throw new InternalServerErrorException(`Falha ao atualizar o fornecedor '${id}'.`, {
        cause,
      });
    }
  }

  async activate(id: string): Promise<Supplier | null> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        await tx.supplierContact.updateMany({
          where: { supplierId: id, active: false },
          data: {
            active: true,
          },
        });
        await tx.supplierAddress.updateMany({
          where: { supplierId: id, active: false },
          data: {
            active: true,
          },
        });

        return await tx.supplier.update({
          where: { id, active: false },
          data: {
            active: true,
          },
          include: {
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
      });
    } catch (cause) {
      if (cause instanceof UnauthorizedException) {
        throw new UnauthorizedException('Acesso não autorizado.', { cause });
      }

      if (cause instanceof Prisma.PrismaClientKnownRequestError) {
        if (cause.code === PrismaErrorCodes.RECORD_NOT_FOUND) {
          throw new NotFoundException(`Fornecedor '${id}' não encontrado.`, { cause });
        }
      }

      throw new InternalServerErrorException(`Falha ao ativar o fornecedor '${id}'.`, {
        cause,
      });
    }
  }

  async deactivate(id: string): Promise<Supplier | null> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        await tx.supplierContact.updateMany({
          where: { supplierId: id, active: true },
          data: {
            active: false,
          },
        });
        await tx.supplierAddress.updateMany({
          where: { supplierId: id, active: true },
          data: {
            active: false,
          },
        });

        return await tx.supplier.update({
          where: { id, active: true },
          data: {
            active: false,
          },
          include: {
            contacts: {
              where: { active: false },
              include: {
                contact: true,
              },
            },
            addresses: {
              where: { active: false },
              include: {
                address: true,
              },
            },
          },
        });
      });
    } catch (cause) {
      if (cause instanceof UnauthorizedException) {
        throw new UnauthorizedException('Acesso não autorizado.', { cause });
      }

      if (cause instanceof Prisma.PrismaClientKnownRequestError) {
        if (cause.code === PrismaErrorCodes.RECORD_NOT_FOUND) {
          throw new NotFoundException(`Fornecedor '${id}' não encontrado.`, { cause });
        }
      }

      throw new InternalServerErrorException(`Falha ao desativar o fornecedor '${id}'.`, {
        cause,
      });
    }
  }

  async remove(id: string): Promise<Supplier> {
    try {
      return await this.prisma.supplier.delete({
        where: { id },
      });
    } catch (cause) {
      if (cause instanceof UnauthorizedException) {
        throw new UnauthorizedException('Acesso não autorizado.', { cause });
      }

      if (cause instanceof Prisma.PrismaClientKnownRequestError) {
        if (cause.code === PrismaErrorCodes.RECORD_NOT_FOUND) {
          throw new NotFoundException(`Fornecedor '${id}' não encontrado.`, { cause });
        }
      }

      throw new InternalServerErrorException(`Falha ao deletar o fornecedor '${id}'.`, {
        cause,
      });
    }
  }
}
