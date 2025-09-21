import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto, UpdateServiceDto } from './service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  findAll(@Query('customerId') customerId?: string) {
    if (customerId) {
      return this.servicesService.findByCustomer(customerId);
    }
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const service = this.servicesService.findOne(id);
    if (!service) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }
    return service;
  }

  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    const service = this.servicesService.update(id, updateServiceDto);
    if (!service) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }
    return service;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const success = this.servicesService.remove(id);
    if (!success) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Service deleted successfully' };
  }
}