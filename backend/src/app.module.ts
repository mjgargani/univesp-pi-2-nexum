import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './entities/users/users.module';
import { SuppliersModule } from './entities/suppliers/suppliers.module';
import { PartTemplatesModule } from './entities/part-templates/part-templates.module';
import { ManufacturersModule } from './entities/manufacturers/manufacturers.module';
import { VehicleTemplatesModule } from './entities/vehicle-templates/vehicle-templates.module';
import { ServiceTemplatesModule } from './entities/service-templates/service-templates.module';
import { OrdersModule } from './entities/orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './entities/posts/posts.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    SuppliersModule,
    PartTemplatesModule,
    ManufacturersModule,
    VehicleTemplatesModule,
    ServiceTemplatesModule,
    OrdersModule,
    AuthModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
