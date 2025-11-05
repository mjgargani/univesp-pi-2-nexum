import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateManufacturerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  complement?: string;
}
