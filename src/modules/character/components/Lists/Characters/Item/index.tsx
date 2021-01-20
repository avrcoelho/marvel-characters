import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { CharacterModel } from '../../../../models/Character.model';
import ButtonFavorite from '../../../Buttons/Favorite';
import { AddOrRemoveFavoriteParams } from '..';

import { Container } from './styles';

interface Props {
  character: CharacterModel;
  addOrRemoveFavorite: (data: AddOrRemoveFavoriteParams) => void;
}

const Item = ({ character, addOrRemoveFavorite }: Props): JSX.Element => {
  const handleAddOrReoveRavorite = useCallback(() => {
    const isFavorite = !character.isFavorite;

    addOrRemoveFavorite({ isFavorite, character });
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

        <ButtonFavorite
          onClick={handleAddOrReoveRavorite}
          isFavorite={!!character.isFavorite}
        />
      </div>
    </Container>
  );
};

export default Item;
