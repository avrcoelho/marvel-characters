/* eslint-disable no-useless-constructor */
import IHttpClientModel from '../../../shared/infra/http/axios-http-client/models/IHttpClient.model';
import generateApiCredentials from '../../../shared/utils/generateApiCredentials';
import {
  ComicDataContainerModel,
  ComicDataWrapperModel,
} from '../models/Comic.model';

class GetCharacterComicService {
  constructor(private readonly axiosHttpClient: IHttpClientModel) {}

  public async execute(characterId: string): Promise<ComicDataContainerModel> {
    const { ts, apikey, hash } = generateApiCredentials();

    const params = {
      ts,
      hash,
      apikey,
    };

    try {
      const {
        data: { data },
      } = await this.axiosHttpClient.get<ComicDataWrapperModel>({
        url: `/characters/${characterId}/comics`,
        params,
      });

      return data;
    } catch (error) {
      return error;
    }
  }
}

export default GetCharacterComicService;
