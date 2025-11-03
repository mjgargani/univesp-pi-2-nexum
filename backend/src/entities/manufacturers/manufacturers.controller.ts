import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ManufacturersService } from './manufacturers.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleTemplateName } from 'src/auth/roles.enum';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

@Controller('manufacturers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ManufacturersController {
  constructor(private readonly manufacturersService: ManufacturersService) {}

  @Get()
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  findAll() {
    return this.manufacturersService.findAll();
  }

  @Get(':id')
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  findOne(@Param('id') id: string) {
    return this.manufacturersService.findOne(id);
  }

  @Post()
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  create(@Body() dto: CreateManufacturerDto) {
    return this.manufacturersService.create(dto);
  }

  @Put(':id')
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  update(@Param('id') id: string, @Body() dto: UpdateManufacturerDto) {
    return this.manufacturersService.update(id, dto);
  }

  @Delete(':id')
  @Roles(RoleTemplateName.ADMIN)
  remove(@Param('id') id: string) {
    return this.manufacturersService.remove(id);
  }
}
