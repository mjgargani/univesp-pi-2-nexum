import { Module } from '@nestjs/common';
import { VehicleTemplatesService } from './vehicle-templates.service';
import { VehicleTemplatesController } from './vehicle-templates.controller';

@Module({
  controllers: [VehicleTemplatesController],
  providers: [VehicleTemplatesService],
})
export class VehicleTemplatesModule {}
