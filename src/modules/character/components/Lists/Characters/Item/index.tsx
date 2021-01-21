import { Link } from 'react-router-dom';

import { CharacterModel } from '../../../../models/Character.model';
import ButtonFavorite from '../../../Buttons/Favorite';

import { Container } from './styles';

interface Props {
  character: CharacterModel;
  handleAddOrRemoveFavorite: (character: CharacterModel) => void;
}

const Item = ({ character, handleAddOrRemoveFavorite }: Props): JSX.Element => {
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
          onClick={() => handleAddOrRemoveFavorite(character)}
          isFavorite={!!character.isFavorite}
        />
      </div>
    </Container>
  );
};

export default Item;
