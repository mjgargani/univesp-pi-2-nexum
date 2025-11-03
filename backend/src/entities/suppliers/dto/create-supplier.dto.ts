import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOctal,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from 'src/entities/addresses/dto/create-address.dto';
import { CreateContactDto } from 'src/entities/contacts/dto/create-contact.dto';

export class CreateSupplierDto {
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  document: string;

  @IsString()
  @IsOptional()
  complement?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateContactDto)
  @ArrayMinSize(1) // Pelo menos um contato
  @ArrayMaxSize(10) // Limite arbitrário para evitar excesso de contatos
  contacts: CreateContactDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  @ArrayMinSize(1) // Pelo menos um endereço
  @ArrayMaxSize(10) // Limite arbitrário para evitar excesso de endereços
  addresses: CreateAddressDto[];
}
