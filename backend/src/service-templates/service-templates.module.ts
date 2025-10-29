import { Module } from '@nestjs/common';
import { ServiceTemplatesService } from './service-templates.service';
import { ServiceTemplatesController } from './service-templates.controller';

@Module({
  providers: [ServiceTemplatesService],
  controllers: [ServiceTemplatesController]
})
export class ServiceTemplatesModule {}
