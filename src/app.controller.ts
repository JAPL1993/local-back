import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { StatusService } from './microsip/cotifast/status/status.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private statusService: StatusService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/ser')
  getSer() {
    return this.statusService.example();
  }
}
