import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { serviceErrorHandler } from 'src/utils/serviceErrors';
import { Crud, Entity, Subject } from '../crud.enum';
import { CreateServiceTemplateDto } from './dto/create-service-template.dto';
import { UpdateServiceTemplateDto } from './dto/update-service-template.dto';

@Injectable()
export class ServiceTemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return this.prisma.serviceTemplate.findMany({
        include: {
          steps: true,
        },
      });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.TEMPLATE_SERVICE, method: Crud.READ, sub: Subject.ALL });
    }
  }

  async findOne(id: string) {
    try {
      return this.prisma.serviceTemplate.findUnique({
        where: { id },
        include: {
          steps: true,
        },
      });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.TEMPLATE_SERVICE, method: Crud.READ, sub: id });
    }
  }

  async create(dto: CreateServiceTemplateDto) {
    try {
      const { steps, ...templateData } = dto;
      return this.prisma.serviceTemplate.create({
        data: {
          ...templateData,
          steps: {
            create: steps,
          },
        },
        include: {
          steps: true,
        },
      });
    } catch (cause) {
      serviceErrorHandler(cause, {
        entity: Entity.TEMPLATE_SERVICE,
        method: Crud.CREATE,
        sub: dto.name || Subject.UNDEFINED,
        data: dto,
      });
    }
  }

  async update(id: string, dto: UpdateServiceTemplateDto) {
    try {
      const { steps, ...templateData } = dto;

      const dataToUpdate: Prisma.ServiceTemplateUpdateInput = { ...templateData };

      return this.prisma.serviceTemplate.update({
        where: { id },
        data: {
          ...dataToUpdate,
          steps: {
            set: [],
            create: steps,
          },
        },
      });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.TEMPLATE_SERVICE, method: Crud.UPDATE, sub: id, data: dto });
    }
  }

  async remove(id: string) {
    try {
      return this.prisma.serviceTemplate.delete({
        where: { id },
      });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.TEMPLATE_SERVICE, method: Crud.DELETE, sub: id });
    }
  }
}
