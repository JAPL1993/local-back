import { Controller, Get } from '@nestjs/common';

@Controller('create-product')
export class CreateProductController {
  @Get()
  hello() {
    console.log('exampke');
  }
}
