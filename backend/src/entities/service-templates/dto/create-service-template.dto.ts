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
import { CreateServiceStepDto } from 'src/entities/service-steps/dto/create-service-step.dto';

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
  @ArrayMinSize(3) // Pelo menos três etapas possíveis ("Agendado", "Em andamento", "Concluído")
  @ArrayMaxSize(30) // Limite arbitrário para evitar excesso de etapas
  steps: CreateServiceStepDto[];
}
