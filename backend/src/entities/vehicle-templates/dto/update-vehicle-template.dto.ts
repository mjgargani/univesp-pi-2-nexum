import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleTemplateDto } from './create-vehicle-template.dto';

export class UpdateVehicleTemplateDto extends PartialType(CreateVehicleTemplateDto) {}
