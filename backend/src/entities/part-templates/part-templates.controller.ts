import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PartTemplatesService } from './part-templates.service';
import { CreatePartTemplateDto } from './dto/create-part-template.dto';
import { UpdatePartTemplateDto } from './dto/update-part-template.dto';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { RoleTemplateName } from '../../auth/roles.enum';

@Controller('part-templates')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PartTemplatesController {
  constructor(private readonly partTemplatesService: PartTemplatesService) {}

  @Get()
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  findAll() {
    return this.partTemplatesService.findAll();
  }

  @Get(':id')
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  findOne(@Param('id') id: string) {
    return this.partTemplatesService.findOne(id);
  }

  @Post()
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  create(@Body() dto: CreatePartTemplateDto) {
    return this.partTemplatesService.create(dto);
  }

  @Put(':id')
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  update(@Param('id') id: string, @Body() dto: UpdatePartTemplateDto) {
    return this.partTemplatesService.update(id, dto);
  }

  @Delete(':id')
  @Roles(RoleTemplateName.ADMIN)
  remove(@Param('id') id: string) {
    return this.partTemplatesService.remove(id);
  }
}
