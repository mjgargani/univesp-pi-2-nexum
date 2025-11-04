import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { SuppliersService } from './suppliers.service';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { RoleTemplateName } from '../../auth/roles.enum';
import formTemplate from './forms/default.json';

type SupplierFormType = typeof formTemplate;
const supplierForm: SupplierFormType = formTemplate;
@Controller('suppliers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SuppliersController {
  constructor(private readonly SuppliersService: SuppliersService) {}

  @Get('form')
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  async getForm() {
    return supplierForm;
  }

  @Get()
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  async findAll() {
    return this.SuppliersService.findAll();
  }

  @Get(':id')
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  async findOne(@Param('id') id: string) {
    return this.SuppliersService.findOne(id);
  }

  @Post()
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  async create(@Body() dto: CreateSupplierDto) {
    return this.SuppliersService.create(dto);
  }

  @Patch(':id')
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  async update(@Param('id') id: string, @Body() dto: UpdateSupplierDto) {
    return this.SuppliersService.update(id, dto);
  }

  @Patch(':id/activate')
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  async activate(@Param('id') id: string) {
    return this.SuppliersService.activate(id);
  }

  @Patch(':id/deactivate')
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  async deactivate(@Param('id') id: string) {
    return this.SuppliersService.deactivate(id);
  }

  @Delete(':id')
  @Roles(RoleTemplateName.ADMIN)
  async remove(@Param('id') id: string) {
    return this.SuppliersService.remove(id);
  }
}
