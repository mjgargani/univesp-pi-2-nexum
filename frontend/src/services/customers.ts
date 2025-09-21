import { ApiService } from './api';
import type { Customer, CreateCustomerDto, UpdateCustomerDto } from '../types';

export class CustomerService {
  static async getAll(): Promise<Customer[]> {
    return ApiService.get<Customer[]>('/customers');
  }

  static async getById(id: string): Promise<Customer> {
    return ApiService.get<Customer>(`/customers/${id}`);
  }

  static async create(customer: CreateCustomerDto): Promise<Customer> {
    return ApiService.post<Customer>('/customers', customer);
  }

  static async update(id: string, customer: UpdateCustomerDto): Promise<Customer> {
    return ApiService.put<Customer>(`/customers/${id}`, customer);
  }

  static async delete(id: string): Promise<{ message: string }> {
    return ApiService.delete<{ message: string }>(`/customers/${id}`);
  }
}