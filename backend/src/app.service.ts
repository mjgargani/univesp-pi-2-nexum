import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // mensagem de boas-vindas na rota raiz da api

  getHello(): string {
    return 'Welcome to Nexum - Customer Service and Mechanical Services Management API';
  }
}
