import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { serviceErrorHandler } from '../../utils/serviceErrors';
import { Crud, Entity, Subject } from '../crud.enum';
import { CreateVehicleTemplateDto } from './dto/create-vehicle-template.dto';
import { UpdateVehicleTemplateDto } from './dto/update-vehicle-template.dto';

@Injectable()
export class VehicleTemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return this.prisma.vehicleTemplate.findMany({
        include: {
          manufacturer: true,
        },
      });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.TEMPLATE_VEHICLE, method: Crud.READ, sub: Subject.ALL });
    }
  }

  async findOne(id: string) {
    try {
      return this.prisma.vehicleTemplate.findUnique({
        where: { id },
        include: {
          manufacturer: true,
        },
      });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.TEMPLATE_VEHICLE, method: Crud.READ, sub: id });
    }
  }

  async create(dto: CreateVehicleTemplateDto) {
    try {
      const { manufacturerId, ...vehicleTemplateData } = dto;
      return this.prisma.vehicleTemplate.create({
        data: {
          ...vehicleTemplateData,
          manufacturer: {
            connect: { id: manufacturerId },
          },
        },
        include: {
          manufacturer: true,
        },
      });
    } catch (cause) {
      serviceErrorHandler(cause, {
        entity: Entity.TEMPLATE_VEHICLE,
        method: Crud.CREATE,
        sub: dto.name || Subject.UNDEFINED,
        data: dto,
      });
    }
  }

  async update(id: string, dto: UpdateVehicleTemplateDto) {
    try {
      const { manufacturerId, ...vehicleTemplateData } = dto;
      return this.prisma.vehicleTemplate.update({
        where: { id },
        data: {
          ...vehicleTemplateData,
          manufacturer: {
            connect: { id: manufacturerId },
          },
        },
        include: {
          manufacturer: true,
        },
      });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.TEMPLATE_VEHICLE, method: Crud.UPDATE, sub: id, data: dto });
    }
  }

  async remove(id: string) {
    try {
      return this.prisma.vehicleTemplate.delete({ where: { id } });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.TEMPLATE_VEHICLE, method: Crud.DELETE, sub: id });
    }
  }
}
