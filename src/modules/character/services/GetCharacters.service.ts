/* eslint-disable no-useless-constructor */
import IHttpClientMOdel from '../../../shared/infra/http/axios-http-client/models/IHttpClient.model';
import generateApiCredentials from '../../../shared/utils/generateApiCredentials';
import {
  CharacterDataContainerModel,
  CharacterDataWrapperModel,
} from '../models/Character.model';

class GetCharactersService {
  constructor(private readonly axiosHttpClient: IHttpClientMOdel) {}

  public async execute(search = ''): Promise<CharacterDataContainerModel> {
    const { ts, apiKey, hash } = generateApiCredentials();

    try {
      const {
        data: { data },
      } = await this.axiosHttpClient.get<CharacterDataWrapperModel>({
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
