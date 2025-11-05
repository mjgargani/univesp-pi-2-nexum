import { Injectable } from '@nestjs/common';
import { RoleTemplateName } from '../../auth/roles.enum';

import admin from './mock/admin-menu.json';
import manager from './mock/manager-menu.json';
import customer from './mock/customer-menu.json';

type AdminViewType = typeof admin;
const adminView: AdminViewType = admin;

type ManagerViewType = typeof manager;
const managerView: ManagerViewType = manager;

type CustomerViewType = typeof customer;
const customerView: CustomerViewType = customer;

type MenuViewType = AdminViewType | ManagerViewType | CustomerViewType;

@Injectable()
export class MenuService {
  findAll(roles: RoleTemplateName[]): Partial<MenuViewType> {
    const menuPartial: Partial<MenuViewType> = [
      ...(roles.includes(RoleTemplateName.ADMIN) ? adminView : []),
      ...(roles.includes(RoleTemplateName.MANAGER) ? managerView : []),
      ...(roles.includes(RoleTemplateName.CUSTOMER) ? customerView : []),
    ];
    return menuPartial;
  }
}
