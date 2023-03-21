import { Injectable } from '@nestjs/common';
import { SocketClient, SocketEmit, SocketEvent } from 'src/socket.service';

@Injectable()
export class ExampleService extends SocketClient {
  constructor() {
    super('http://localhost:8085/microsip');
  }

  @SocketEvent('insertFolio')
  private insertFolio(data: any) {
    console.log('evento emitido');
    console.log(data);
    this.fldsmfr(data.data + 'emitido');
  }

  @SocketEmit('insertFolio')
  private fldsmfr(data) {
    console.log('evento emitido');
  }
}
