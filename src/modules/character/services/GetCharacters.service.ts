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
    const { ts, apikey, hash } = generateApiCredentials();

    const params = {
      ts,
      hash,
      apikey,
      orderBy: 'name',
    };

    if (search) {
      Object.assign(params, { nameStartsWith: search });
    }

    try {
      const {
        data: { data },
      } = await this.axiosHttpClient.get<CharacterDataWrapperModel>({
        url: '/characters',
        params,
      });

      return data;
    } catch (error) {
      return error;
    }
  }
}

export default GetCharactersService;
