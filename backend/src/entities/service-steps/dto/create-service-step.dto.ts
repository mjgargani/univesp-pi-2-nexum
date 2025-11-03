import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateServiceStepDto {
  @IsNumber()
  @IsNotEmpty()
  stepNumber: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  estimatedDuration: number;

  @IsString()
  @IsOptional()
  complement?: string;
}
