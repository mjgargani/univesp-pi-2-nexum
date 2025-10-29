import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { PrismaModule } from './prisma/prisma.module';
import { ContactsModule } from './contacts/contacts.module';
import { AddressesModule } from './addresses/addresses.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [UsersModule, ServicesModule, PrismaModule, ContactsModule, AddressesModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}