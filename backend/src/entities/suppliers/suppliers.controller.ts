import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SuppliersService } from './suppliers.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Controller('suppliers')
@UseGuards(JwtAuthGuard)
export class SuppliersController {
  constructor(private readonly SuppliersService: SuppliersService) {}

  @Get()
  @Roles('admin', 'user')
  @UseGuards(RolesGuard)
  async findAll() {
    return this.SuppliersService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user')
  @UseGuards(RolesGuard)
  async findOne(@Param('id') id: string) {
    return this.SuppliersService.findOne(id);
  }

  @Post()
  @Roles('admin', 'user')
  @UseGuards(RolesGuard)
  async create(@Body() dto: CreateSupplierDto) {
    return this.SuppliersService.create(dto);
  }

  @Patch(':id')
  @Roles('admin', 'user')
  @UseGuards(RolesGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateSupplierDto) {
    return this.SuppliersService.update(id, dto);
  }

  @Patch(':id/activate')
  @Roles('admin', 'user')
  @UseGuards(RolesGuard)
  async activate(@Param('id') id: string) {
    return this.SuppliersService.activate(id);
  }

  @Patch(':id/deactivate')
  @Roles('admin', 'user')
  @UseGuards(RolesGuard)
  async deactivate(@Param('id') id: string) {
    return this.SuppliersService.deactivate(id);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(RolesGuard)
  async remove(@Param('id') id: string) {
    return this.SuppliersService.remove(id);
  }
}
