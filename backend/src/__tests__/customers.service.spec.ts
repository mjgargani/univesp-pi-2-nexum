import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from '../customers/customers.service';
import { CreateCustomerDto } from 'src/customers/customer.dto';

describe('CustomersService', () => {
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersService],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all customers', () => {
    const customers = service.findAll();
    expect(customers).toHaveLength(2);
    expect(customers[0].name).toBe('João Silva');
  });

  it('should find a customer by id', () => {
    const customer = service.findOne('1');
    expect(customer).toBeDefined();
    expect(customer?.name).toBe('João Silva');
  });

  it('should create a new customer', () => {
    const newCustomer: CreateCustomerDto = {
      name: 'Test Customer',
      email: 'test@example.com',
      phone: '(11) 12345-6789',
      address: 'Test Address',
    };

    const createdCustomer = service.create(newCustomer);
    expect(createdCustomer).toBeDefined();
    expect(createdCustomer.name).toBe(newCustomer.name);
    expect(createdCustomer.id).toBeDefined();
  });

  it('should update a customer', () => {
    const updatedData = { name: 'Updated Name' };
    const updated = service.update('1', updatedData);
    
    expect(updated).toBeDefined();
    expect(updated?.name).toBe('Updated Name');
  });

  it('should delete a customer', () => {
    const result = service.remove('1');
    expect(result).toBe(true);
    
    const customer = service.findOne('1');
    expect(customer).toBeUndefined();
  });
});