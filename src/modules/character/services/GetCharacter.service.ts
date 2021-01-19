/* eslint-disable no-useless-constructor */
import IHttpClientModel from '../../../shared/infra/http/axios-http-client/models/IHttpClient.model';
import generateApiCredentials from '../../../shared/utils/generateApiCredentials';
import {
  CharacterDataContainerModel,
  CharacterDataWrapperModel,
} from '../models/Character.model';

class GetCharacterService {
  constructor(private readonly axiosHttpClient: IHttpClientModel) {}

  public async execute(
    characterId: string,
  ): Promise<CharacterDataContainerModel> {
    const { ts, apikey, hash } = generateApiCredentials();

    const params = {
      ts,
      hash,
      apikey,
    };

    try {
      const {
        data: { data },
      } = await this.axiosHttpClient.get<CharacterDataWrapperModel>({
        url: `/characters/${characterId}`,
        params,
      });

      return data;
    } catch (error) {
      return error;
    }
  }
}

export default GetCharacterService;
