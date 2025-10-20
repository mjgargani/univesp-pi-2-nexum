import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { ServicesModule } from './services/services.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [CustomersModule, ServicesModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}