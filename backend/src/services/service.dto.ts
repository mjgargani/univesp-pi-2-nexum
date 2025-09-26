// "DTO" - Data Transfer Objects para criação e atualização de serviços
// Define a estrutura dos dados esperados ao criar ou atualizar um serviço

export class CreateServiceDto {
  customerId: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedCost: number;
  scheduledDate: Date;
}

export class UpdateServiceDto {
  title?: string;
  description?: string;
  status?: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  estimatedCost?: number;
  actualCost?: number;
  scheduledDate?: Date;
  completedDate?: Date;
}