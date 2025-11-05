import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RoleTemplateName } from '../../auth/roles.enum';

@Controller('menu')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @Roles(RoleTemplateName.ADMIN, RoleTemplateName.MANAGER, RoleTemplateName.CUSTOMER)
  async findAll(@Request() req) {
    const user = req.user;
    const userRoles: RoleTemplateName[] = user.roles.map((role: { name: RoleTemplateName }) => role.name);
    return this.menuService.findAll(userRoles);
  }
}
