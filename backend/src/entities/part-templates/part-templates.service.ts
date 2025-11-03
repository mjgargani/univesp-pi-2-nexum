import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePartTemplateDto } from './dto/create-part-template.dto';
import { UpdatePartTemplateDto } from './dto/update-part-template.dto';
import { serviceErrorHandler } from 'src/utils/serviceErrors';
import { Crud, Entity, Subject } from '../crud.enum';

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
      serviceErrorHandler(cause, { entity: Entity.TEMPLATE_PART, method: Crud.READ, sub: Subject.ALL });
    }
  }

  async findOne(id: string) {
    try {
      return this.prisma.partTemplate.findUnique({ where: { id }, include: { suppliers: true } });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.TEMPLATE_PART, method: Crud.READ, sub: id });
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
      serviceErrorHandler(cause, {
        entity: Entity.TEMPLATE_PART,
        method: Crud.CREATE,
        sub: dto.name || Subject.UNDEFINED,
        data: dto,
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
      serviceErrorHandler(cause, { entity: Entity.TEMPLATE_PART, method: Crud.UPDATE, sub: id, data: dto });
    }
  }

  async remove(id: string) {
    try {
      return this.prisma.partTemplate.delete({ where: { id } });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.TEMPLATE_PART, method: Crud.DELETE, sub: id });
    }
  }
}
