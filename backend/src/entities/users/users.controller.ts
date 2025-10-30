import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('customers')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get()
  @Roles('admin')
  @UseGuards(RolesGuard)
  findAll() {
    return this.UsersService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  @UseGuards(RolesGuard)
  findOne(@Param('id') id: string) {
    const customer = this.UsersService.findOne(id);
    if (!customer) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return customer;
  }

  @Get('profile/:id')
  @Roles('admin', 'user')
  @UseGuards(RolesGuard)
  getProfile(@Param('id') id: string) {
    const customer = this.UsersService.findOne(id);
    if (!customer) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return customer;
  }

  @Post()
  @Roles('admin')
  @UseGuards(RolesGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.UsersService.create(createUserDto);
  }

  @Put(':id')
  @Roles('admin')
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const customer = this.UsersService.update(id, dto);
    if (!customer) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return customer;
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    const success = this.UsersService.remove(id);
    if (!success) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return { message: 'Usuário desabilitado com sucesso' };
  }
}
