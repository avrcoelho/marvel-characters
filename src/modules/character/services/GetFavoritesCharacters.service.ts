/* eslint-disable no-useless-constructor */
import ICache from '../../../shared/infra/cache/models/ICache';
import { CharacterModel } from '../models/Character.model';
import FavoriteCharacterModel from '../models/FavoriteCharacter.model';

class GetFavoritesCharactersService {
  constructor(private readonly cache: ICache) {}

  private keyCache = '@characters/favorites';

  public execute(search = ''): FavoriteCharacterModel {
    let favorites = this.cache.get<CharacterModel[]>(this.keyCache);

    if (search && favorites) {
      favorites = favorites.filter(favorite =>
        favorite.name.startsWith(search),
      );
    }

    return {
      results: favorites || [],
      count: favorites?.length || 0,
    };
  }
}

export default GetFavoritesCharactersService;
