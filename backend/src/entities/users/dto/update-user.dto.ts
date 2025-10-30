import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';

export enum RoleTemplateName {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  CUSTOMER = 'CUSTOMER',
}
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsArray()
  @IsOptional()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  roles?: RoleTemplateName[];

  @IsString()
  @IsOptional()
  newPassword?: string;
}
