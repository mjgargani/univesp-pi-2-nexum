import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateVehicleTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  complement?: string;

  @IsString()
  @IsNotEmpty()
  manufacturerId: string;
}
