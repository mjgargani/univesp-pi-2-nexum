import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ServiceTemplatesModule } from '../service-templates/service-templates.module';
import { PartTemplatesModule } from '../part-templates/part-templates.module';
import { VehicleTemplatesModule } from '../vehicle-templates/vehicle-templates.module';

@Module({
  imports: [PrismaModule],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
