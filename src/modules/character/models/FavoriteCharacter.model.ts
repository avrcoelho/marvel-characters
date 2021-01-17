import { CharacterModel } from './Character.model';

export default interface FavoriteCharacterModel {
  count: number;
  results: CharacterModel[];
}
