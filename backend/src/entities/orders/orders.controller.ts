import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleTemplateName } from 'src/auth/roles.enum';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Post()
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }

  @Put(':id')
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.ordersService.update(id, dto);
  }

  @Put(':id/activate')
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  activate(@Param('id') id: string) {
    return this.ordersService.activate(id);
  }

  @Put(':id/deactivate')
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER)
  deactivate(@Param('id') id: string) {
    return this.ordersService.deactivate(id);
  }

  @Delete(':id')
  @Roles(RoleTemplateName.ADMIN)
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }

  // Endpoints para os usuários finais

  @Post('estimate')
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER, RoleTemplateName.CUSTOMER)
  estimate(@Body() dto: UpdateOrderDto) {
    return this.ordersService.estimate(dto);
  }

  @Get('customer')
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER, RoleTemplateName.CUSTOMER)
  findAllByUserId(@Request() req) {
    const userId = req.user.sub;
    return this.ordersService.findAllByUserId(userId);
  }

  @Post('customer')
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER, RoleTemplateName.CUSTOMER)
  createUserOrder(@Request() req, @Body() dto: CreateOrderDto) {
    const userId = req.user.sub;
    return this.ordersService.createUserOrder(userId, dto);
  }

  @Put('customer/:orderId/cancel')
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER, RoleTemplateName.CUSTOMER)
  cancelUserOrder(@Request() req, @Param('orderId') orderId: string) {
    const userId = req.user.sub;
    return this.ordersService.cancelUserOrder(userId, orderId);
  }
}
