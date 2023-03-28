import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleService } from './socket/example/example.service';
import { MicrosipModule } from './microsip/microsip.module';
import { StatusService } from './microsip/cotifast/status/status.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MicrosipModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ExampleService, StatusService],
})
export class AppModule {}
