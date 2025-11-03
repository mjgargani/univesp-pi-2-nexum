import { SetMetadata } from '@nestjs/common';
import { RoleTemplateName } from '../../auth/roles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleTemplateName[]) => SetMetadata(ROLES_KEY, roles);
