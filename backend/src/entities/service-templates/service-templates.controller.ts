import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ServiceTemplatesService } from './service-templates.service';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RoleTemplateName } from '../../auth/roles.enum';
import { CreateServiceTemplateDto } from './dto/create-service-template.dto';

@Controller('service-templates')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ServiceTemplatesController {
  constructor(private readonly serviceTemplatesService: ServiceTemplatesService) {}

  @Get()
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  findAll() {
    return this.serviceTemplatesService.findAll();
  }

  @Get(':id')
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  findOne(@Param('id') id: string) {
    return this.serviceTemplatesService.findOne(id);
  }

  @Post()
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  create(@Body() dto: CreateServiceTemplateDto) {
    return this.serviceTemplatesService.create(dto);
  }

  @Put(':id')
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  update(@Param('id') id: string, @Body() dto: CreateServiceTemplateDto) {
    return this.serviceTemplatesService.update(id, dto);
  }

  @Delete(':id')
  @Roles(RoleTemplateName.ADMIN)
  remove(@Param('id') id: string) {
    return this.serviceTemplatesService.remove(id);
  }
}
