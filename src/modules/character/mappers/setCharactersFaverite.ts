import { CharacterModel } from '../models/Character.model';

interface IParams {
  characters: CharacterModel[];
  favorites: CharacterModel[];
}

const setCharactersFaverite = ({
  characters,
  favorites,
}: IParams): CharacterModel[] => {
  const charactersUpdated = characters.map(character => {
    const foundInFavorites = favorites.find(
      favorite => favorite.id === character.id,
    );

    if (foundInFavorites) {
      return { ...character, isFavorite: true };
    }

    return character;
  });

  return charactersUpdated;
};

export default setCharactersFaverite;
