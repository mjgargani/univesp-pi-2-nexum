import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator"

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  vehicleId: string;

  @IsDate()
  @IsNotEmpty()
  scheduled: Date;

  @IsNumber()
  @IsNotEmpty()
  budget: number;

  @IsString()
  @IsOptional()
  complement?: string;

  
}