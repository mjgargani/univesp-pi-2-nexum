import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsOptional()
  complement?: string;

  @IsArray()
  @IsNotEmpty()
  @IsUUID('4', { each: true }) // Valida se cada item no array é um UUID v4
  @ArrayMinSize(1) // Pelo menos um serviço é obrigatório
  @ArrayMaxSize(10) // Limite arbitrário para evitar excesso de serviços
  serviceTemplateIds: string[]; // Array de IDs dos ServiceTemplates

  @IsString()
  @IsUUID('4')
  @IsNotEmpty()
  userVehicleTemplateId: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  scheduled: Date;
}
