import { useCallback } from 'react';

import { useCharacter } from '../../../hooks/context/character';
import { CharacterModel } from '../../../models/Character.model';
import Item from './Item';

import { Container } from './styles';

export interface AddOrRemoveFavoriteParams {
  isFavorite: boolean;
  character: CharacterModel;
}

const Characters = (): JSX.Element => {
  const { characters, saveFavorite, removeFavorite } = useCharacter();

  const addOrRemoveFavorite = useCallback(
    ({ isFavorite, character }: AddOrRemoveFavoriteParams): void => {
      if (isFavorite) {
        saveFavorite(character);

        return;
      }

      removeFavorite(character.id);
    },
    [removeFavorite, saveFavorite],
  );

  return (
    <Container>
      {characters?.results.map(character => (
        <Item
          key={String(character.id)}
          character={character}
          addOrRemoveFavorite={addOrRemoveFavorite}
        />
      ))}
    </Container>
  );
};

export default Characters;
