import { ConfigService } from '@nestjs/config';
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';

export class HttpService {
  private readonly microsip: AxiosInstance;
  private readonly cotifast: AxiosInstance;
  private readonly laravel: AxiosInstance;

  constructor(private configService: ConfigService) {
    // Crea el primer cliente Axios con una URL base.
    this.microsip = axios.create({
      baseURL: configService.get('URL_API_MICROSIP'),
    });

    // Crea el segundo cliente Axios con otra URL base.
    this.cotifast = axios.create({
      baseURL: configService.get('URL_API_NODE'),
    });

    // Crea el tercer cliente Axios con otra URL base.
    this.laravel = axios.create({
      baseURL: configService.get('URL_API_LARAVEL'),
    });

    // Agrega un interceptor a ambos clientes para agregar un encabezado personalizado a cada solicitud.
    this.microsip.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        config.headers['X-Custom-Header'] = 'Client 1';
        return config;
      },
    );

    this.cotifast.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        config.headers['X-Custom-Header'] = 'Client 2';
        return config;
      },
    );

    // Agrega un interceptor al segundo cliente para agregar una clave adicional al cuerpo de cada solicitud.
    this.microsip.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        config.data = { ...config.data, extraKey: 'extraValue' };
        return config;
      },
    );
  }

  async getmicrosipData(url?: string): Promise<AxiosResponse> {
    // Realiza una solicitud GET al cliente 1 con una URL opcional para completar la URL base.
    return this.microsip.get(url ? url : '/data');
  }

  async getcotifastData(url?: string): Promise<AxiosResponse> {
    // Realiza una solicitud GET al cliente 2 con una URL opcional para completar la URL base.
    return this.cotifast.get(url ? url : '/data');
  }

  async postmicrosipData(data: any, url?: string): Promise<AxiosResponse> {
    // Realiza una solicitud POST al cliente 1 con datos y una URL opcional para completar la URL base.
    return this.microsip.post(url ? url : '/data', data);
  }

  async postcotifastData(data: any, url?: string): Promise<AxiosResponse> {
    // Realiza una solicitud POST al cliente 2 con datos y una URL opcional para completar la URL base.
    return this.cotifast.post(url ? url : '/data', data);
  }

  async putmicrosipData(data: any, url?: string): Promise<AxiosResponse> {
    // Realiza una solicitud PUT al cliente 1 con datos y una URL opcional para completar la URL base.
    return this.microsip.put(url ? url : '/data', data);
  }

  async putcotifastData(data: any, url?: string): Promise<AxiosResponse> {
    // Realiza una solicitud PUT al cliente 2 con datos y una URL opcional para completar la URL base.
    return this.cotifast.put(url ? url : '/data', data);
  }

  async deletemicrosipData(url?: string): Promise<AxiosResponse> {
    // Realiza una solicitud DELETE al cliente 1 con una URL opcional para completar la URL base.
    return this.microsip.delete(url ? url : '/data');
  }

  async deletecotifastData(url?: string): Promise<AxiosResponse> {
    // Realiza una solicitud DELETE al cliente 2 con una URL opcional para
    return this.cotifast.delete(url ? url : '/data');
  }
}
