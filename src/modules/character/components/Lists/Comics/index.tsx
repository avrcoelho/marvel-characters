import { ComicModel } from '../../../models/Comic.model';
import Item from './Item';

import { Container } from './styles';

interface Props {
  comics: ComicModel[];
}

const Comics = ({ comics }: Props): JSX.Element => {
  return (
    <Container>
      <h2>Ultimos lançamentos</h2>

      <ul>
        {comics.map(comic => (
          <Item key={String(comic.id)} comic={comic} />
        ))}
      </ul>
    </Container>
  );
};

export default Comics;
