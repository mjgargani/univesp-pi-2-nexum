import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// inicia (escuta) a api na porta definida em PORT ou 3001

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(port);
  console.log(`Backend server running on http://localhost:${port}`);
}
bootstrap();