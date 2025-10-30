import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { CreateAddressDto } from 'src/entities/addresses/dto/create-address.dto';
import { CreateContactDto } from 'src/entities/contacts/dto/create-contact.dto';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  document: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  birthDate?: Date;

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
