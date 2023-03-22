import { io, Socket } from 'socket.io-client';
import 'reflect-metadata';

export class SocketClient {
  private socket: Socket;

  constructor(url: string) {
    this.socket = io(url);
    this.socket.on('connect', () => {
      console.log('conectado');
    });
    console.log('constructor creado');
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
          console.log(`Resultado lado del decorador: ${response}`);
          resolve(response);
        });
      }).then((response) => {
        return originalMethod.apply(this, [response, ...args]);
      });
    };
    return descriptor;
  };
}
