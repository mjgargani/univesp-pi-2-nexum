import { SetMetadata } from '@nestjs/common';
import { RoleTemplateName } from 'src/entities/users/dto/update-user.dto';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleTemplateName[]) => SetMetadata(ROLES_KEY, roles);
