import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../components/Headers/Character';
import CharacterDetails from '../../components/CharacterDetails';
import ListComics from '../../components/Lists/Comics';
import Footer from '../../components/Footer';
import { useCharacterDetails } from '../../hooks/characterDetails';

import { Container, MainContainer, CharacterNameBg } from './styles';

interface ParamsRoute {
  id: string;
}

const Character = (): JSX.Element => {
  const { id } = useParams<ParamsRoute>();
  const {
    addOrRemoveFavorite,
    getCharacterDetails,
    characterDetails,
    comics,
    dateOfLastComic,
  } = useCharacterDetails();

  useEffect(() => {
    getCharacterDetails(id);
  }, [getCharacterDetails, id]);

  return (
    <>
      <Container>
        <Header />
        {characterDetails && (
          <>
            <MainContainer>
              <div className="content">
                <CharacterDetails
                  character={characterDetails}
                  dateOfLastComic={dateOfLastComic}
                  handleAddOrRemoveFavorite={addOrRemoveFavorite}
                />

                <img
                  src={`${characterDetails.thumbnail.path}.${characterDetails.thumbnail.extension}`}
                  alt={characterDetails.name}
                />
              </div>

              <CharacterNameBg>{characterDetails?.name}</CharacterNameBg>
            </MainContainer>

            <ListComics comics={comics} />
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Character;
