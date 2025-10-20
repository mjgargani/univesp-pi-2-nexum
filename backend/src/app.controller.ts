import { Controller, Get,  } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  // endpoint de verificação de saúde da API
  @Get('health')
  getHealth() {
    return { status: 'OK', service: 'Nexum API', timestamp: new Date().toISOString() };
  }
}