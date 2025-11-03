import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { serviceErrorHandler } from 'src/utils/serviceErrors';
import { Crud, Entity, Subject } from '../crud.enum';

@Injectable()
export class ManufacturersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return this.prisma.manufacturer.findMany({
        where: { active: true },
        include: {
          vehicles: true,
        },
      });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.MANUFACTURER, method: Crud.READ, sub: Subject.ALL });
    }
  }

  async findOne(id: string) {
    try {
      return this.prisma.manufacturer.findUnique({
        where: { id, active: true },
        include: { vehicles: true },
      });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.MANUFACTURER, method: Crud.READ, sub: id });
    }
  }

  async create(dto: CreateManufacturerDto) {
    try {
      return this.prisma.manufacturer.create({
        data: {
          ...dto,
          active: true,
        },
      });
    } catch (cause) {
      serviceErrorHandler(cause, {
        entity: Entity.MANUFACTURER,
        method: Crud.CREATE,
        sub: dto.name || Subject.UNDEFINED,
        data: dto,
      });
    }
  }

  async update(id: string, dto: UpdateManufacturerDto) {
    try {
      return this.prisma.manufacturer.update({
        where: { id, active: true },
        data: dto,
      });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.MANUFACTURER, method: Crud.UPDATE, sub: id, data: dto });
    }
  }

  async activate(id: string) {
    try {
      return this.prisma.manufacturer.update({
        where: { id, active: false },
        data: { active: true },
      });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.MANUFACTURER, method: Crud.UPDATE, sub: id });
    }
  }

  async deactivate(id: string) {
    try {
      return this.prisma.manufacturer.update({
        where: { id, active: true },
        data: { active: false },
      });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.MANUFACTURER, method: Crud.UPDATE, sub: id });
    }
  }

  async remove(id: string) {
    try {
      return this.prisma.manufacturer.delete({
        where: { id },
      });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.MANUFACTURER, method: Crud.DELETE, sub: id });
    }
  }
}
