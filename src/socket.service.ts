import { io, Socket } from 'socket.io-client';
import 'reflect-metadata';
import { ConfigService } from '@nestjs/config';

export class SocketClient {
  private socket: Socket;
  private configService: ConfigService;
  constructor(url: string) {
    this.configService = new ConfigService();
    this.socket = io(`${this.configService.get('URL_SOCKET_SERVER')}${url}`);
    this.socket.on('connect', () => {
      console.log('conectado');
    });
    this.initializeEvents();
  }

  private initializeEvents() {
    const properties = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    properties.forEach((property) => {
      const event = Reflect.getMetadata('socket:event', this, property);
      if (event) {
        this.socket.on(event, (...args: any[]) => {
          // eslint-disable-next-line prefer-spread
          this[property].apply(this, args);
        });
      }
    });
  }

  public emit(event: string, ...args: any[]) {
    this.socket.emit(event, ...args);
  }
}

export function SocketEvent(event: string) {
  return function (
    target: any,
    propertyKey: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    descriptor: PropertyDescriptor,
  ) {
    Reflect.defineMetadata('socket:event', event, target, propertyKey);
  };
}

export function SocketEmit(event: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      this.emit(event, ...args);
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}

export function SocketEmitWithResponse(event: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      return new Promise((resolve, reject) => {
        this.emit(event, ...args, (response: any) => {
          resolve(response);
        });
      }).then((response) => {
        return originalMethod.apply(this, [response, ...args]);
      });
    };
    return descriptor;
  };
}
