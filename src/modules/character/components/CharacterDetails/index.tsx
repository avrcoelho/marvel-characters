import { Container } from './styles';

import { ReactComponent as Rating } from '../../../../assets/svgs/rating.svg';
import { ReactComponent as Comic } from '../../../../assets/svgs/comic.svg';
import { ReactComponent as Movie } from '../../../../assets/svgs/movie.svg';
import { CharacterModel } from '../../models/Character.model';
import ButtonFavorite from '../Buttons/Favorite';

interface Props {
  character: CharacterModel;
  handleAddOrReoveRavorite: () => void;
}

const CharacterDetails = ({
  character,
  handleAddOrReoveRavorite,
}: Props): JSX.Element => {
  return (
    <Container>
      <div className="title-favorite">
        <h1 className="title">{character.name}</h1>

        <ButtonFavorite
          onClick={handleAddOrReoveRavorite}
          isFavorite={!!character.isFavorite}
        />
      </div>

      <p>{character.description}</p>

      <div className="amount-comic-movie">
        <dl>
          <dt>Quadrinhos</dt>
          <dd>
            <Comic />
            {character.comics.returned}
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
