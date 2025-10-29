import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('customers')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get()
  findAll() {
    return this.UsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const customer = this.UsersService.findOne(id);
    if (!customer) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return customer;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.UsersService.create(createUserDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const customer = this.UsersService.update(id,dto);
    if (!customer) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return customer;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const success = this.UsersService.remove(id);
    if (!success) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return { message: 'Usuário desabilitado com sucesso' };
  }
}