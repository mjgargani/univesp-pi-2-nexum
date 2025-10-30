import { Module } from '@nestjs/common';
import { PartTemplatesService } from './part-templates.service';
import { PartTemplatesController } from './part-templates.controller';

@Module({
  providers: [PartTemplatesService],
  controllers: [PartTemplatesController],
})
export class PartTemplatesModule {}
