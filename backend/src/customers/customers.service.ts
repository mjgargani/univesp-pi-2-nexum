import { Injectable } from '@nestjs/common';
import { Customer } from './customer.interface';
import { CreateCustomerDto, UpdateCustomerDto } from './customer.dto';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '(11) 99999-9999',
      address: 'Rua das Flores, 123, São Paulo, SP',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@email.com',
      phone: '(11) 88888-8888',
      address: 'Av. Paulista, 456, São Paulo, SP',
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02'),
    },
  ];

  findAll(): Customer[] {
    return this.customers;
  }

  findOne(id: string): Customer | undefined {
    return this.customers.find(customer => customer.id === id);
  }

  create(createCustomerDto: CreateCustomerDto): Customer {
    const newCustomer: Customer = {
      id: Date.now().toString(),
      ...createCustomerDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto): Customer | undefined {
    const customerIndex = this.customers.findIndex(customer => customer.id === id);
    if (customerIndex === -1) {
      return undefined;
    }
    
    this.customers[customerIndex] = {
      ...this.customers[customerIndex],
      ...updateCustomerDto,
      updatedAt: new Date(),
    };
    return this.customers[customerIndex];
  }

  remove(id: string): boolean {
    const customerIndex = this.customers.findIndex(customer => customer.id === id);
    if (customerIndex === -1) {
      return false;
    }
    this.customers.splice(customerIndex, 1);
    return true;
  }
}