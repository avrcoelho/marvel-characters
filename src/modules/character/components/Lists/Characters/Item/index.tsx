import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { CharacterModel } from '../../../../models/Character.model';
import { ReactComponent as Hearth } from '../../../../../../assets/svgs/hearth-sm.svg';
import { ReactComponent as HearthBorder } from '../../../../../../assets/svgs/hearth-border-sm.svg';

import { Container } from './styles';

interface Props {
  character: CharacterModel;
  addOrRemoveFavorite: (addToFavorite: boolean) => void;
}

const Item = ({ character, addOrRemoveFavorite }: Props): JSX.Element => {
  const handleAddOrReoveRavorite = useCallback(() => {
    const addToFavorite = !character.isFavorite;

    addOrRemoveFavorite(addToFavorite);
  }, [addOrRemoveFavorite, character]);

  return (
    <Container>
      <Link to={`/character/${character.id}`}>
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
        />
      </Link>

      <div className="character-name-and-favorite">
        <span>{character.name}</span>

        <button type="button" onClick={handleAddOrReoveRavorite}>
          {character.isFavorite ? (
            <Hearth data-testid="hearth" />
          ) : (
            <HearthBorder data-testid="hearth-border" />
          )}
        </button>
      </div>
    </Container>
  );
};

export default Item;
