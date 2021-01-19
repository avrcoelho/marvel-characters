/* eslint-disable no-useless-constructor */
import IHttpClientModel from '../../../shared/infra/http/axios-http-client/models/IHttpClient.model';
import generateApiCredentials from '../../../shared/utils/generateApiCredentials';
import {
  CharacterDataContainerModel,
  CharacterDataWrapperModel,
  CharacterModel,
} from '../models/Character.model';
import ICache from '../../../shared/infra/cache/models/ICache';
import setCharactersFaverite from '../mappers/setCharactersFaverite';

class GetCharactersService {
  constructor(
    private readonly axiosHttpClient: IHttpClientModel,
    private readonly cache: ICache,
  ) {}

  private keyCache = '@characters/favorites';

  public async execute(search?: string): Promise<CharacterDataContainerModel> {
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

      const favorites = this.cache.get<CharacterModel[]>(this.keyCache);

      if (favorites) {
        const settedFavorites = setCharactersFaverite({
          characters: data.results,
          favorites,
        });

        data.results = settedFavorites;
      }

      return data;
    } catch (error) {
      return error;
    }
  }
}

export default GetCharactersService;
