import { Module } from '@nestjs/common';
import { VehicleTemplatesService } from './vehicle-templates.service';
import { VehicleTemplatesController } from './vehicle-templates.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VehicleTemplatesController],
  providers: [VehicleTemplatesService],
})
export class VehicleTemplatesModule {}
