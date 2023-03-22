import { Injectable } from '@nestjs/common';
import {
  SocketClient,
  SocketEmit,
  SocketEmitWithResponse,
  SocketEvent,
} from 'src/socket.service';

@Injectable()
export class ExampleService extends SocketClient {
  constructor() {
    super('http://localhost:8085/');
  }

  @SocketEvent('insertFolio')
  private insertFolio(data: any) {
    this.fldsmfr(data.data + ': emitido').then((result) => {
      console.log(`de la priomesa resultado : ${result}`);
    });
  }

  @SocketEmitWithResponse('hello')
  private async fldsmfr(data) {
    return Promise.resolve(data);
  }
}
