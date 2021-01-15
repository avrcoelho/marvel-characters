import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { IApiGetDTO } from './dtos/IApi.dto';

class AxiosHttpClient {
  private baseUrl: string | undefined;

  private axiosInstance: AxiosInstance | any = null;

  constructor() {
    this.axiosInstance = axios.create({});
    this.baseUrl = process.env.API_URL;
  }

  protected get<Response>({
    url,
    params = null,
    headers = null,
  }: IApiGetDTO): Promise<AxiosResponse<Response>> {
    return this.axiosInstance({
      method: 'GET',
      url: `${this.baseUrl}${url}`,
      params: params || null,
      headers: headers || null,
    });
  }
}

export default AxiosHttpClient;
