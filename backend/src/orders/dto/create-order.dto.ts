import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator"

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  vehicleId: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  scheduled: Date;

  @IsNumber()
  @IsNotEmpty()
  budget: number;

  @IsString()
  @IsOptional()
  complement?: string;

  @IsArray()
  @IsUUID('4', { each: true }) // Valida se cada item no array é um UUID v4
  @ArrayMinSize(1) // Pelo menos um serviço é obrigatório
  @ArrayMaxSize(10) // Limite arbitrário para evitar excesso de serviços
  serviceTemplateIds: string[]; // Array de IDs dos ServiceTemplates

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional() // Peças podem ser opcionais
  @ArrayMaxSize(100) // Limite arbitrário para evitar excesso de peças
  partTemplateIds?: string[];
}