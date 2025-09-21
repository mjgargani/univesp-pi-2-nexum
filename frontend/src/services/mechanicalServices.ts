import { ApiService } from './api';
import type { MechanicalService, CreateServiceDto, UpdateServiceDto } from '../types';

export class MechanicalServiceService {
  static async getAll(): Promise<MechanicalService[]> {
    return ApiService.get<MechanicalService[]>('/services');
  }

  static async getByCustomer(customerId: string): Promise<MechanicalService[]> {
    return ApiService.get<MechanicalService[]>(`/services?customerId=${customerId}`);
  }

  static async getById(id: string): Promise<MechanicalService> {
    return ApiService.get<MechanicalService>(`/services/${id}`);
  }

  static async create(service: CreateServiceDto): Promise<MechanicalService> {
    return ApiService.post<MechanicalService>('/services', service);
  }

  static async update(id: string, service: UpdateServiceDto): Promise<MechanicalService> {
    return ApiService.put<MechanicalService>(`/services/${id}`, service);
  }

  static async delete(id: string): Promise<{ message: string }> {
    return ApiService.delete<{ message: string }>(`/services/${id}`);
  }
}