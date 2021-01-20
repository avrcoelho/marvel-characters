import { Container } from './styles';

import { ReactComponent as Hearth } from '../../../../assets/svgs/hearth-sm.svg';
import { ReactComponent as HearthBorder } from '../../../../assets/svgs/hearth-border-sm.svg';
import { ReactComponent as Rating } from '../../../../assets/svgs/rating.svg';
import { ReactComponent as Comic } from '../../../../assets/svgs/comic.svg';
import { ReactComponent as Movie } from '../../../../assets/svgs/movie.svg';

const CharacterDetails = (): JSX.Element => {
  return (
    <Container>
      <div className="title-favorite">
        <h1 className="title">Hulk</h1>

        <button type="button">
          <Hearth data-testid="hearth" />
        </button>
      </div>

      <p>jskj ksdj ksd</p>

      <div className="amount-comic-movie">
        <dl>
          <dt>Quadrinhos</dt>
          <dd>
            <Comic />
            3.000
          </dd>
        </dl>
        <dl>
          <dt>Filmes</dt>
          <dd>
            <Movie />5
          </dd>
        </dl>
      </div>
      <div className="rate-last-comic">
        <div>
          <strong>Rating:</strong> <Rating />
        </div>
        <div>
          <strong>Último quadrinho:</strong> 13 fev. 2020
        </div>
      </div>
    </Container>
  );
};

export default CharacterDetails;
