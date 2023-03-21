import { Module } from '@nestjs/common';
import { CreateProductController } from './create-product/create-product.controller';
import { UpdateProductController } from './update-product/update-product.controller';
import { PriceController } from './price/price.controller';
import { CustomerController } from './customer/customer.controller';
import { CotifastModule } from './cotifast/cotifast.module';
import { ReportModule } from './report/report.module';

@Module({
  controllers: [
    CreateProductController,
    UpdateProductController,
    PriceController,
    CustomerController,
  ],
  imports: [CotifastModule, ReportModule],
})
export class MicrosipModule {}
