/* eslint-disable no-useless-constructor */
import * as crypto from 'crypto';

import IHttpClientMOdel from '../../../shared/infra/http/axios-http-client/models/IHttpClient.model';
import { CharacterDataContainerModel } from '../models/Character.model';

class GetCharactersService {
  constructor(private readonly axiosHttpClient: IHttpClientMOdel) {}

  public async execute(search = ''): Promise<CharacterDataContainerModel> {
    const ts = new Date().getTime();
    const apiKey = String(process.env.REACT_APP_API_PUBLIC_KEY);
    const privateApiKey = String(process.env.REACT_APP_API_PRIVATE_KEY);
    const hash = crypto.createHash('md5').update(ts + privateApiKey + apiKey);

    try {
      const {
        data,
      } = await this.axiosHttpClient.get<CharacterDataContainerModel>({
        url: '/characters',
        params: {
          ts,
          hash,
          apiKey,
          search,
        },
      });

      return data;
    } catch (error) {
      return error;
    }
  }
}

export default GetCharactersService;
