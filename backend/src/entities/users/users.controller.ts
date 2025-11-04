import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleTemplateName } from '../../auth/roles.enum';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get()
  @Roles(RoleTemplateName.ADMIN)
  async findAll(@Request() req) {
    return this.UsersService.findAll();
  }

  @Get(':id')
  @Roles(RoleTemplateName.ADMIN)
  async findOne(@Param('id') id: string) {
    return this.UsersService.findOne(id);
  }

  @Get('profile')
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER, RoleTemplateName.CUSTOMER)
  async getProfile(@Request() req) {
    const userId = req.user.sub;
    return this.UsersService.findOne(userId);
  }

  @Post()
  @Roles(RoleTemplateName.ADMIN)
  async create(@Body() dto: CreateUserDto) {
    return this.UsersService.create(dto);
  }

  @Patch(':id')
  @Roles(RoleTemplateName.ADMIN)
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.UsersService.update(id, dto);
  }

  @Patch(':id/activate')
  @Roles(RoleTemplateName.ADMIN)
  async activate(@Param('id') id: string) {
    return this.UsersService.activate(id);
  }

  @Patch(':id/deactivate')
  @Roles(RoleTemplateName.ADMIN)
  async deactivate(@Param('id') id: string) {
    return this.UsersService.deactivate(id);
  }

  @Delete(':id')
  @Roles(RoleTemplateName.ADMIN)
  async remove(@Param('id') id: string) {
    return this.UsersService.remove(id);
  }
}
