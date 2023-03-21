import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleService } from './socket/example/example.service';
import { MicrosipModule } from './microsip/microsip.module';
import { StatusService } from './microsip/cotifast/status/status.service';

@Module({
  imports: [MicrosipModule],
  controllers: [AppController],
  providers: [AppService, ExampleService, StatusService],
})
export class AppModule {}
