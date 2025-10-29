import { Module } from '@nestjs/common';
import { ServiceStepsService } from './service-steps.service';

@Module({
  providers: [ServiceStepsService]
})
export class ServiceStepsModule {}
