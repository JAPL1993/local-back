import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SocketClient,
  SocketEmit,
  SocketEmitWithResponse,
  SocketEvent,
} from 'src/socket.service';

@Injectable()
export class ExampleService extends SocketClient {
  constructor() {
    super('');
  }

  @SocketEvent('insertFolio')
  private insertFolio(data: any) {
    console.log('esto se emite');
    console.log(data);
    this.fldsmfr(data).then((result) => {
      console.log(result);
    });
  }

  @SocketEmitWithResponse('hello')
  private async fldsmfr(data) {
    return Promise.resolve(data);
  }

  async emitEventResponse(data) {
    return await this.fldsmfr(data);
  }
}
