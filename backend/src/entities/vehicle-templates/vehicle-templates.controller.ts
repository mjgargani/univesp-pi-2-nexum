import { Controller } from '@nestjs/common';
import { VehicleTemplatesService } from './vehicle-templates.service';

@Controller('vehicle-templates')
export class VehicleTemplatesController {
  constructor(private readonly vehicleTemplatesService: VehicleTemplatesService) {}
}
