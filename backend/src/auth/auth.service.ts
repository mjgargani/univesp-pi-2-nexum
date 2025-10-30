import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/entities/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'generated/client';

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

  async login(user: User) {
    const payload = { username: user.user, sub: user.id, roles: [user.roles] };
  }
}
