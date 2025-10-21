import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/create-user.dto';

@Controller('customers')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get()
  findAll() {
    return this.UsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const customer = this.UsersService.findOne(id);
    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    return customer;
  }

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.UsersService.create(createCustomerDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    const customer = this.UsersService.update(id, updateCustomerDto);
    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    return customer;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const success = this.UsersService.remove(id);
    if (!success) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Customer deleted successfully' };
  }
}