import { Link } from 'react-router-dom';

import { CharacterModel } from '../../../../models/Character.model';

import { Container } from './styles';

interface Props {
  character: CharacterModel;
}

const Item = ({ character }: Props): JSX.Element => {
  return (
    <Container>
      <Link to={`/character/${character.id}`}>
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
        />
      </Link>
    </Container>
  );
};

export default Item;
