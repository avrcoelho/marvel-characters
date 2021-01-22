import ICache from '../../../shared/infra/cache/models/ICache';
import { CharacterModel } from '../models/Character.model';
import FavoriteCharacterModel from '../models/FavoriteCharacter.model';

class SaveFavoriteCharacterService {
  constructor(private readonly cache: ICache) {}

  private keyCache = '@characters/favorites';

  public execute(newFavorite: CharacterModel): FavoriteCharacterModel {
    const favoritesCached = this.cache.get<CharacterModel[]>(this.keyCache);

    if (favoritesCached && favoritesCached.length > 4) {
      throw new Error('Somente é permitido 5 favoritos');
    }

    let favorites: CharacterModel[];
    if (!favoritesCached) {
      favorites = [];
    } else {
      favorites = favoritesCached;
    }

    favorites.push({ ...newFavorite, isFavorite: true });

    const parsedFavorites = JSON.stringify(favorites);

    this.cache.save(this.keyCache, parsedFavorites);

    return {
      results: favorites,
      count: favorites.length,
    };
  }
}

export default SaveFavoriteCharacterService;
