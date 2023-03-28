import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { StatusService } from './microsip/cotifast/status/status.service';
import { ExampleService } from './socket/example/example.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private statusService: StatusService,
    private service: ExampleService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/ser')
  async getSer() {
    const data = await this.service.emitEventResponse('exampleee del emit');
    return data;
  }
}
