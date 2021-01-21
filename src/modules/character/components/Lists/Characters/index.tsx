import { useCallback } from 'react';

import { useCharacter } from '../../../hooks/context/character';
import { CharacterModel } from '../../../models/Character.model';
import Item from './Item';

import { Container } from './styles';

const Characters = (): JSX.Element => {
  const { characters, saveFavorite, removeFavorite } = useCharacter();

  const handleAddOrReoveRavorite = useCallback(
    (character: CharacterModel): void => {
      if (character.isFavorite) {
        removeFavorite(character.id);

        return;
      }

      saveFavorite(character);
    },
    [removeFavorite, saveFavorite],
  );

  return (
    <Container>
      {characters?.results.map(character => (
        <Item
          key={String(character.id)}
          character={character}
          handleAddOrReoveRavorite={handleAddOrReoveRavorite}
        />
      ))}
    </Container>
  );
};

export default Characters;
