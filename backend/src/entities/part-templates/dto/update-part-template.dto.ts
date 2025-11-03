import { PartialType } from '@nestjs/mapped-types';
import { CreatePartTemplateDto } from './create-part-template.dto';

export class UpdatePartTemplateDto extends PartialType(CreatePartTemplateDto) {}
