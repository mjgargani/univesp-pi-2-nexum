import { Injectable } from '@nestjs/common';
import { MechanicalService } from './service.interface';
import { CreateServiceDto, UpdateServiceDto } from './service.dto';

@Injectable()
export class ServicesService {
  private services: MechanicalService[] = [
    {
      id: '1',
      customerId: '1',
      title: 'Troca de óleo',
      description: 'Troca de óleo do motor e filtro',
      status: 'completed',
      priority: 'medium',
      estimatedCost: 150.00,
      actualCost: 145.00,
      scheduledDate: new Date('2024-01-15'),
      completedDate: new Date('2024-01-15'),
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      customerId: '2',
      title: 'Reparo do freio',
      description: 'Substituição das pastilhas de freio dianteiras',
      status: 'in_progress',
      priority: 'high',
      estimatedCost: 350.00,
      scheduledDate: new Date('2024-01-20'),
      createdAt: new Date('2024-01-18'),
      updatedAt: new Date('2024-01-19'),
    },
    {
      id: '3',
      customerId: '1',
      title: 'Revisão geral',
      description: 'Revisão completa do veículo incluindo motor, freios, suspensão',
      status: 'pending',
      priority: 'medium',
      estimatedCost: 800.00,
      scheduledDate: new Date('2024-02-01'),
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-01-25'),
    },
  ];

  findAll(): MechanicalService[] {
    return this.services;
  }

  findByCustomer(customerId: string): MechanicalService[] {
    return this.services.filter(service => service.customerId === customerId);
  }

  findOne(id: string): MechanicalService | undefined {
    return this.services.find(service => service.id === id);
  }

  create(createServiceDto: CreateServiceDto): MechanicalService {
    const newService: MechanicalService = {
      id: Date.now().toString(),
      ...createServiceDto,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.services.push(newService);
    return newService;
  }

  update(id: string, updateServiceDto: UpdateServiceDto): MechanicalService | undefined {
    const serviceIndex = this.services.findIndex(service => service.id === id);
    if (serviceIndex === -1) {
      return undefined;
    }
    
    this.services[serviceIndex] = {
      ...this.services[serviceIndex],
      ...updateServiceDto,
      updatedAt: new Date(),
    };
    return this.services[serviceIndex];
  }

  remove(id: string): boolean {
    const serviceIndex = this.services.findIndex(service => service.id === id);
    if (serviceIndex === -1) {
      return false;
    }
    this.services.splice(serviceIndex, 1);
    return true;
  }
}