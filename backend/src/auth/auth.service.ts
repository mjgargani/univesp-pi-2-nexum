import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../entities/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'generated/client';
import { RoleTemplateName } from '../auth/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(user: string, password: string): Promise<any> {
    const currentUser = await this.usersService.findOneByUser(user);

    if (!!user && (await bcrypt.compare(password, currentUser.password))) {
      const { password, ...result } = currentUser;
      return result;
    }

    return null;
  }

  async login(user: User & { roles: { roleTemplate: { name: RoleTemplateName } }[] }) {
    const payload = { username: user.userName, sub: user.id, roles: user.roles.map((role) => role.roleTemplate.name) };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
