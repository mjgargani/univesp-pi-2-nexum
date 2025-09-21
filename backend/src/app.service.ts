import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to Nexum - Customer Service and Mechanical Services Management API';
  }
}