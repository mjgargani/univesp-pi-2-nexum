import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { VehicleTemplatesService } from './vehicle-templates.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RoleTemplateName } from '../../auth/roles.enum';
import { CreateVehicleTemplateDto } from './dto/create-vehicle-template.dto';
import { UpdateVehicleTemplateDto } from './dto/update-vehicle-template.dto';

@Controller('vehicle-templates')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VehicleTemplatesController {
  constructor(private readonly vehicleTemplatesService: VehicleTemplatesService) {}

  @Get()
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  findAll() {
    return this.vehicleTemplatesService.findAll();
  }

  @Get(':id')
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  findOne(@Param('id') id: string) {
    return this.vehicleTemplatesService.findOne(id);
  }

  @Post()
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  create(@Body() dto: CreateVehicleTemplateDto) {
    return this.vehicleTemplatesService.create(dto);
  }

  @Put(':id')
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  update(@Param('id') id: string, @Body() dto: UpdateVehicleTemplateDto) {
    return this.vehicleTemplatesService.update(id, dto);
  }

  @Delete(':id')
  @Roles(RoleTemplateName.ADMIN)
  remove(@Param('id') id: string) {
    return this.vehicleTemplatesService.remove(id);
  }
}
