import { useCallback } from 'react';

import { CharacterModel } from '../../../models/Character.model';
import { useCharacter } from '../../../hooks/context/character';

import { ReactComponent as Hearth } from '../../../../../assets/svgs/hearth-sm.svg';
import { ReactComponent as HearthBorder } from '../../../../../assets/svgs/hearth-border-sm.svg';
import { Container } from './styles';

interface Props {
  character: CharacterModel;
}

const Favorite = ({ character }: Props): JSX.Element => {
  const { removeFavorite, saveFavorite } = useCharacter();

  const addOrRemoveFavorite = useCallback((): void => {
    if (character.isFavorite) {
      removeFavorite(character.id);

      return;
    }

    saveFavorite(character);
  }, [character, removeFavorite, saveFavorite]);

  return (
    <Container type="button" onClick={addOrRemoveFavorite}>
      {character.isFavorite ? (
        <Hearth data-testid="hearth" />
      ) : (
        <HearthBorder data-testid="hearth-border" />
      )}
    </Container>
  );
};

export default Favorite;
