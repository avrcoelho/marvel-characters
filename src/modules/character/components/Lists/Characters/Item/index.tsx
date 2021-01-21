import { Link } from 'react-router-dom';

import { CharacterModel } from '../../../../models/Character.model';
import ButtonFavorite from '../../../Buttons/Favorite';

import { Container } from './styles';

interface Props {
  character: CharacterModel;
  handleAddOrReoveRavorite: (character: CharacterModel) => void;
}

const Item = ({ character, handleAddOrReoveRavorite }: Props): JSX.Element => {
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
          onClick={() => handleAddOrReoveRavorite(character)}
          isFavorite={!!character.isFavorite}
        />
      </div>
    </Container>
  );
};

export default Item;
