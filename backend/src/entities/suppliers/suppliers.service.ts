import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Supplier } from 'generated/client';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { serviceErrorHandler } from '../../utils/serviceErrors';
import { Crud, Entity, Subject } from '../crud.enum';

/**
 * Dado que a entidade Supplier segue a mesma linha de raciocínio da entidade User,
 * muitos dos métodos aqui implementados são similares aos da entidade UserService.
 * Lembrando que um Supplier, assim como um User, pode ter múltiplos contatos e endereços
 * associados - relação 1:N. [{@link src/entities/users/users.service.ts}].
 */
@Injectable()
export class SuppliersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Supplier[]> {
    try {
      return await this.prisma.supplier.findMany({
        where: { active: true },
        include: {
          contacts: true,
          addresses: true,
        },
      });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.SUPPLIER, method: Crud.READ, sub: Subject.ALL });
    }
  }

  async findOne(id: string): Promise<Supplier | null> {
    try {
      return await this.prisma.supplier.findUnique({
        where: { id, active: true },
        include: {
          contacts: true,
          addresses: true,
        },
      });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.SUPPLIER, method: Crud.READ, sub: id });
    }
  }

  async create(dto: CreateSupplierDto): Promise<Supplier> {
    try {
      const { contacts, addresses, ...supplierData } = dto;

      const supplier = await this.prisma.supplier.create({
        data: {
          ...supplierData,
          contacts: {
            create: contacts,
          },
          addresses: {
            create: addresses,
          },
        },
        include: {
          contacts: true,
          addresses: true,
        },
      });

      return supplier;
    } catch (cause) {
      serviceErrorHandler(cause, {
        entity: Entity.SUPPLIER,
        method: Crud.CREATE,
        sub: dto.companyName || Subject.UNDEFINED,
        data: dto,
      });
    }
  }

  async update(id: string, dto: UpdateSupplierDto): Promise<Supplier> {
    try {
      const { contacts, addresses, ...supplierData } = dto;

      const dataToUpdate: Prisma.SupplierUpdateInput = { ...supplierData };

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

      const updatedSupplier = await this.prisma.supplier.update({
        where: { id, active: true },
        data: dataToUpdate,
        include: {
          contacts: true,
          addresses: true,
        },
      });

      return updatedSupplier;
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.SUPPLIER, method: Crud.UPDATE, sub: id, data: dto });
    }
  }

  async activate(id: string): Promise<Supplier | null> {
    try {
      return await this.prisma.supplier.update({
        where: { id, active: false },
        data: { active: true },
      });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.SUPPLIER, method: Crud.UPDATE, sub: id });
    }
  }

  async deactivate(id: string): Promise<Supplier | null> {
    try {
      return await this.prisma.supplier.update({
        where: { id, active: true },
        data: { active: false },
      });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.SUPPLIER, method: Crud.UPDATE, sub: id });
    }
  }

  async remove(id: string): Promise<Supplier> {
    try {
      return await this.prisma.supplier.delete({
        where: { id },
      });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.SUPPLIER, method: Crud.DELETE, sub: id });
    }
  }
}
