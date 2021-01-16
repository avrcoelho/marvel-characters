import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { IApiGetDTO } from './dtos/IApi.dto';
import IHttpClientMOdel from './models/IHttpClient.model';

class AxiosHttpClient implements IHttpClientMOdel {
  private baseUrl: string | undefined;

  private axiosInstance: AxiosInstance | any = null;

  constructor() {
    this.axiosInstance = axios.create({});
    this.baseUrl = process.env.API_URL;
  }

  public get<TResponse>({
    url,
    params = null,
    headers = null,
  }: IApiGetDTO): Promise<AxiosResponse<TResponse>> {
    return this.axiosInstance({
      method: 'GET',
      url: `${this.baseUrl}${url}`,
      params: params || null,
      headers: headers || null,
    });
  }
}

export default AxiosHttpClient;
