import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ContactsModule } from './contacts/contacts.module';
import { AddressesModule } from './addresses/addresses.module';
import { OrdersModule } from './orders/orders.module';
import { PartTemplatesModule } from './part-templates/part-templates.module';
import { ServiceTemplatesModule } from './service-templates/service-templates.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { ManufacturersModule } from './manufacturers/manufacturers.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ServiceStepsModule } from './service-steps/service-steps.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    ContactsModule,
    AddressesModule,
    OrdersModule,
    PartTemplatesModule,
    ServiceTemplatesModule,
    SuppliersModule,
    ManufacturersModule,
    VehiclesModule,
    ServiceStepsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
