import { Module } from '@nestjs/common';
import { HpController } from './hp/hp.controller';

@Module({
  controllers: [HpController]
})
export class ReportModule {}
