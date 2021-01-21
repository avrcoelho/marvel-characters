import { ComicModel } from '../../../../models/Comic.model';

import { Container } from './styles';

interface Props {
  comic: ComicModel;
}

const Item = ({ comic }: Props): JSX.Element => {
  return (
    <Container>
      <img
        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        alt={comic.title}
      />

      <span>{comic.title}</span>
    </Container>
  );
};

export default Item;
