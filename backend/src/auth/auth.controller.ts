import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import formTemplate from './forms/default.json';

type LoginFormType = typeof formTemplate;
const loginForm: LoginFormType = formTemplate;

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('form')
  getForm() {
    return loginForm;
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Body() _loginDto: LoginDto) {
    return this.authService.login(req.user);
  }
}
