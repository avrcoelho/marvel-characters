import ICache from '../../../shared/infra/cache/models/ICache';
import { CharacterModel } from '../models/Character.model';
import FavoriteCharacterModel from '../models/FavoriteCharacter.model';

class RemoveFavoriteCharacterService {
  constructor(private readonly cache: ICache) {}

  private keyCache = '@characters/favorites';

  public execute(characterId: number): FavoriteCharacterModel {
    const favoritesCached = this.cache.get<CharacterModel[]>(this.keyCache);

    const favorites = favoritesCached?.filter(
      favorite => favorite.id !== characterId,
    ) as CharacterModel[];

    const parsedFavorites = JSON.stringify(favorites);

    this.cache.save(this.keyCache, parsedFavorites);

    return {
      results: favorites,
      count: favorites.length,
    };
  }
}

export default RemoveFavoriteCharacterService;
