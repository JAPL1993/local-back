import { Controller, Get, Param } from '@nestjs/common';
import { StatusService } from './status.service';

@Controller('cotifast/status')
export class StatusController {
  constructor(private statusService: StatusService) {}
  @Get(':id')
  hello(@Param('id') id: number) {
    return this.statusService.example();
  }
}
