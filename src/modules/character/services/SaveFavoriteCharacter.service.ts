/* eslint-disable no-useless-constructor */
import ICache from '../../../shared/infra/cache/models/ICache';
import { CharacterModel } from '../models/Character.model';
import FavoriteCharacterModel from '../models/FavoriteCharacter.model';

class SaveFavoriteCharacterService {
  constructor(private readonly cache: ICache) {}

  private keyCache = '@characters/favorites';

  public execute(newFavorite: CharacterModel): FavoriteCharacterModel {
    const favorites = this.cache.get<CharacterModel[]>(this.keyCache);

    if (favorites && favorites.length > 4) {
      throw new Error('Somente é permitido 5 favoritos');
    }

    favorites?.push(newFavorite);

    const parsedFavorites = JSON.stringify(favorites);

    this.cache.save(this.keyCache, parsedFavorites);

    return {
      results: favorites || [],
      count: favorites?.length || 0,
    };
  }
}

export default SaveFavoriteCharacterService;
