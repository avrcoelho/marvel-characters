import { useMemo } from 'react';

import { Container } from './styles';

import { ReactComponent as Rating } from '../../../../assets/svgs/rating.svg';
import { ReactComponent as Comic } from '../../../../assets/svgs/comic.svg';
import { ReactComponent as Movie } from '../../../../assets/svgs/movie.svg';
import { CharacterModel } from '../../models/Character.model';
import ButtonFavorite from '../Buttons/Favorite';

interface Props {
  character: CharacterModel;
  dateOfLastComic: string | null;
  handleAddOrRemoveFavorite: () => void;
}

const CharacterDetails = ({
  character,
  dateOfLastComic,
  handleAddOrRemoveFavorite,
}: Props): JSX.Element => {
  const parsedDate = useMemo(() => {
    if (!dateOfLastComic) {
      return '';
    }

    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateOfLastComic);
    const formated = date.toLocaleDateString('pt-br', options);
    const parsed = formated.replace(/de\s/g, '');

    return parsed;
  }, [dateOfLastComic]);

  return (
    <Container>
      <div className="title-favorite">
        <h1 className="title">{character.name}</h1>

        <ButtonFavorite
          onClick={handleAddOrRemoveFavorite}
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
            <Movie /> {character.series.returned}
          </dd>
        </dl>
      </div>
      <div className="rate-last-comic">
        <div>
          <strong>Rating:</strong> <Rating />
        </div>
        {parsedDate && (
          <div>
            <strong>Último quadrinho:</strong> {parsedDate}
          </div>
        )}
      </div>
    </Container>
  );
};

export default CharacterDetails;
