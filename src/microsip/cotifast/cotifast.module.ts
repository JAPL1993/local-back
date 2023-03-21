import { Module } from '@nestjs/common';
import { QuotationController } from './quotation/quotation.controller';
import { StatusController } from './status/status.controller';
import { StatusService } from './status/status.service';

@Module({
  controllers: [QuotationController, StatusController],
  providers: [StatusService],
})
export class CotifastModule {}
