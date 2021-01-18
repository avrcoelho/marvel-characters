import { useCharacter } from '../../../hooks/context/character';
import Item from './Item';

import { Container } from './styles';

const Characters = (): JSX.Element => {
  const { characters } = useCharacter();

  return (
    <Container>
      {characters?.results.map(character => (
        <Item character={character} />
      ))}
    </Container>
  );
};

export default Characters;
