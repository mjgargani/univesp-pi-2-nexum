import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateServiceStepDto } from '../../../entities/service-steps/dto/create-service-step.dto';

export class CreateServiceTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsString()
  @IsOptional()
  complement?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateServiceStepDto)
  @ArrayMinSize(4) // Pelo menos três etapas possíveis ("Agendado", "Em andamento", "Concluído", "Cancelado")
  @ArrayMaxSize(10) // Limite arbitrário para evitar excesso de etapas
  steps: CreateServiceStepDto[];
}
