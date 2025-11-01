// import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
// import { PartTemplatesService } from './part-templates.service';
// import { CreatePartTemplateDto } from './dto/create-part-template.dto';
// import { UpdatePartTemplateDto } from './dto/update-part-template.dto';
// import { Roles } from 'src/auth/decorators/roles.decorator';
// import { RolesGuard } from 'src/auth/guards/roles.guard';
// import { RoleTemplateName } from 'src/auth/roles.enum';

// @Controller('part-templates')
// @UseGuards(JwtAuthGuard, RolesGuard)
// export class PartTemplatesController {
//   constructor(private readonly partTemplatesService: PartTemplatesService) {}

//   @Get()
//   @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
//   findAll() {
//     return this.partTemplatesService.findAll();
//   }

//   @Get(':id')
//   @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
//   findOne(@Param('id') id: string) {
//     return this.partTemplatesService.findOne(id);
//   }

//   @Post()
//   @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
//   create(@Body() dto: CreatePartTemplateDto) {
//     return this.partTemplatesService.create(dto);
//   }

//   @Put(':id')
//   @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
//   update(@Param('id') id: string, @Body() dto: UpdatePartTemplateDto) {
//     return this.partTemplatesService.update(id, dto);
//   }

//   @Put(':id/activate')
//   @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
//   activate(@Param('id') id: string) {
//     return this.partTemplatesService.activate(id);
//   }

//   @Put(':id/deactivate')
//   @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
//   deactivate(@Param('id') id: string) {
//     return this.partTemplatesService.deactivate(id);
//   }

//   @Delete(':id')
//   @Roles(RoleTemplateName.ADMIN)
//   remove(@Param('id') id: string) {
//     return this.partTemplatesService.remove(id);
//   }
// }
