import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './entities/users/users.module';
import { ContactsModule } from './entities/contacts/contacts.module';
import { AddressesModule } from './entities/addresses/addresses.module';
import { OrdersModule } from './entities/orders/orders.module';
import { PartTemplatesModule } from './entities/part-templates/part-templates.module';
import { ServiceTemplatesModule } from './entities/service-templates/service-templates.module';
import { SuppliersModule } from './entities/suppliers/suppliers.module';
import { ManufacturersModule } from './entities/manufacturers/manufacturers.module';
import { VehiclesModule } from './entities/vehicles/vehicles.module';
import { ServiceStepsModule } from './entities/service-steps/service-steps.module';
import { AuthModule } from './auth/auth.module';

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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
