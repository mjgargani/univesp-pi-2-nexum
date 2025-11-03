import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { serviceErrorHandler } from '../../utils/serviceErrors';
import { Crud, Entity, Subject } from '../crud.enum';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return this.prisma.order.findMany({
        where: { active: true },
        include: {
          services: {
            include: {
              steps: true,
              partTemplates: true,
            },
          },
          statuses: true,
          userVehicleTemplate: true,
        },
      });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.ORDER, method: Crud.READ, sub: Subject.ALL });
    }
  }

  async findOne(id: string) {
    try {
      return this.prisma.order.findUnique({
        where: { id, active: true },
        include: {
          services: {
            include: {
              steps: true,
              partTemplates: true,
            },
          },
          statuses: true,
          userVehicleTemplate: true,
        },
      });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.ORDER, method: Crud.READ, sub: id });
    }
  }

  // Lógica para calcular a estimativa de valor (orçamento) com base nos templates fornecidos
  async estimate(dto: UpdateOrderDto) {
    try {
      const { serviceTemplateIds } = dto;
      let budget = 0.0;
      let conclusion: Date = new Date();
      let cart = [];
      await this.prisma.$transaction(async (tx) => {
        for (const serviceTemplateId of serviceTemplateIds) {
          const serviceTemplate = await tx.serviceTemplate.findUnique({
            where: { id: serviceTemplateId },
            include: {
              steps: true,
              partTemplates: true,
            },
          });
          if (serviceTemplate) {
            budget += 0;
            conclusion = new Date(
              conclusion.getTime() +
                serviceTemplate.steps.reduce((acc, step) => acc + (step.estimatedDuration || 0), 0) * 60000,
              // O `reduce` acima soma a duração estimada de cada etapa do serviço em minutos e converte para milissegundos
              // (1 minuto = 60000 milissegundos)
            );
          }
          cart.push(serviceTemplate);
        }
      });
      return { cart, budget, conclusion };
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.ORDER, method: Crud.READ, sub: Subject.NEW });
    }
  }

  async create(dto: CreateOrderDto) {
    try {
      const { serviceTemplateIds, userVehicleTemplateId, ...orderData } = dto;

      // Cria o pedido com os dados fornecidos, orçamento calculado e número do pedido
      return await this.prisma.$transaction(async (tx) => {
        // Calcula o orçamento
        const { budget, conclusion } = await this.estimate({ serviceTemplateIds });

        // Consulta número do último pedido
        const { lastOrder } = await tx.orderCounter.findFirst();
        const nextOrderNumber = lastOrder + 1;

        // Cria o pedido
        const newOrder = await tx.order.create({
          data: {
            ...orderData,
            number: nextOrderNumber,
            conclusion, // Data estimada de conclusão
            budget, // Orçamento calculado
            value: budget, // Valor inicial definido como o orçamento
            userVehicleTemplateId,
            services: {
              connect: serviceTemplateIds.map((id) => ({ id })),
            },
            statuses: {
              create: { name: 'Pendente' }, // Status inicial "Pendente"
            },
          },
          include: {
            services: {
              include: {
                steps: true,
                partTemplates: true,
              },
            },
            statuses: true,
            userVehicleTemplate: true,
          },
        });

        // Atualiza o contador de pedidos
        await tx.orderCounter.update({
          where: { id: 1 },
          data: { lastOrder: nextOrderNumber },
        });

        return newOrder;
      });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.ORDER, method: Crud.READ, sub: Subject.NEW });
    }
  }

  async update(id: string, dto: UpdateOrderDto) {
    try {
      return this.prisma.order.update({ where: { id }, data: dto });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.ORDER, method: Crud.READ, sub: Subject.ALL });
    }
  }

  async activate(id: string) {
    try {
      return this.prisma.order.update({ where: { id }, data: { active: true } });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.ORDER, method: Crud.READ, sub: Subject.ALL });
    }
  }

  async deactivate(id: string) {
    try {
      return this.prisma.order.update({ where: { id }, data: { active: false } });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.ORDER, method: Crud.READ, sub: Subject.ALL });
    }
  }

  async remove(id: string) {
    try {
      return this.prisma.order.delete({ where: { id } });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.ORDER, method: Crud.READ, sub: Subject.ALL });
    }
  }

  // Métodos para usuários finais

  async findAllByUserId(userId: string) {
    try {
      return this.prisma.$transaction(async (tx) => {
        const userVehicleTemplates = await tx.userVehicleTemplate.findMany({
          where: { userId },
          select: { id: true },
        });

        if (!userVehicleTemplates.length) {
          return [];
        }

        const vehicleIds = userVehicleTemplates.map((vehicle) => vehicle.id);

        return await tx.order.findMany({
          where: {
            userVehicleTemplateId: {
              in: vehicleIds, // Filtra usando "IN"
            },
          },
          include: {
            services: {
              include: {
                steps: true,
                partTemplates: true,
              },
            },
            statuses: true,
            userVehicleTemplate: true,
          },
        });
      });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.ORDER, method: Crud.READ, sub: Subject.ALL });
    }
  }

  async createUserOrder(userId: string, dto: CreateOrderDto) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const { serviceTemplateIds, userVehicleTemplateId, ...orderData } = dto;

        // Verifica se o userVehicleTemplateId pertence ao usuário
        const userVehicleTemplate = await tx.userVehicleTemplate.findFirst({
          where: { id: userVehicleTemplateId, userId },
        });
        if (!userVehicleTemplate) {
          throw new Error('Veículo do usuário não encontrado ou não pertence ao usuário.');
        }

        const newOrder = await this.create({
          ...orderData,
          serviceTemplateIds,
          userVehicleTemplateId,
        });
        return newOrder;
      });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.ORDER, method: Crud.READ, sub: Subject.ALL });
    }
  }

  async cancelUserOrder(userId: string, orderId: string) {
    try {
      return this.prisma.$transaction(async (tx) => {
        // Verifica se o pedido pertence ao usuário
        const order = await tx.order.findFirst({
          where: { id: orderId },
          include: { userVehicleTemplate: true },
        });
        if (!order || order.userVehicleTemplate.userId !== userId) {
          throw new Error('Pedido não encontrado ou não pertence ao usuário.');
        }

        const updatedOrder = await tx.order.update({
          where: { id: orderId },
          data: {
            statuses: {
              create: { name: 'Cancelado' },
            },
          },
        });

        return updatedOrder;
      });
    } catch (cause) {
      serviceErrorHandler(cause, { entity: Entity.ORDER, method: Crud.READ, sub: Subject.ALL });
    }
  }
}
