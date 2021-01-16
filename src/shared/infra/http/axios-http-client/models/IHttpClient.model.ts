import { AxiosResponse } from 'axios';

import { IApiGetDTO } from '../dtos/IApi.dto';

export default interface IHttpClientMOdel {
  get: <TResponse>(data: IApiGetDTO) => Promise<AxiosResponse<TResponse>>;
}
