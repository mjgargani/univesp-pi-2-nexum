import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get()
  @Roles('admin')
  @UseGuards(RolesGuard)
  async findAll() {
    return this.UsersService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  @UseGuards(RolesGuard)
  async findOne(@Param('id') id: string) {
    return this.UsersService.findOne(id);
  }

  @Get('profile')
  @Roles('admin', 'user')
  @UseGuards(RolesGuard)
  async getProfile(@Request() req) {
    const userId = req.user.sub;
    return this.UsersService.findOne(userId);
  }

  @Post()
  @Roles('admin')
  @UseGuards(RolesGuard)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.UsersService.create(createUserDto);
  }

  @Patch(':id')
  @Roles('admin')
  @UseGuards(RolesGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.UsersService.update(id, dto);
  }

  @Patch(':id/activate')
  @Roles('admin')
  @UseGuards(RolesGuard)
  async activate(@Param('id') id: string) {
    return this.UsersService.activate(id);
  }

  @Patch(':id/deactivate')
  @Roles('admin')
  @UseGuards(RolesGuard)
  async deactivate(@Param('id') id: string) {
    return this.UsersService.deactivate(id);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(RolesGuard)
  async remove(@Param('id') id: string) {
    return this.UsersService.remove(id);
  }
}
