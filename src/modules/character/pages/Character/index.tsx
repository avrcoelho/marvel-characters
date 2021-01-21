import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Header from '../../components/Headers/Character';
import CharacterDetails from '../../components/CharacterDetails';
import ListComics from '../../components/Lists/Comics';
import { CharacterModel } from '../../models/Character.model';
import { ComicModel } from '../../models/Comic.model';
import {
  getCharacterService,
  getCharacterComicsService,
  getFavoritesCharactersService,
} from '../../services';
import { useCharacter } from '../../hooks/context/character';

import { Container, MainContainer, CharacterNameBg } from './styles';
import Footer from '../../components/Footer';

interface ParamsRoute {
  id: string;
}

const Character = (): JSX.Element => {
  const [
    characterDetails,
    setCharacterDetails,
  ] = useState<CharacterModel | null>(null);
  const [comics, setComics] = useState<ComicModel[]>([]);

  const { id } = useParams<ParamsRoute>();
  const { saveFavorite, removeFavorite } = useCharacter();

  const verifyIfIsFavorite = useCallback(
    (character: CharacterModel): CharacterModel => {
      const favorites = getFavoritesCharactersService.execute();
      const isFavorite = favorites.results.some(
        favorite => favorite.id === character.id,
      );

      Object.assign(character, { isFavorite });

      return character;
    },
    [],
  );

  const remoteConsultAndSetInState = useCallback(
    async (characterId: string): Promise<void> => {
      const [characterResult, comicResult] = await Promise.all([
        getCharacterService.execute(characterId),
        getCharacterComicsService.execute(characterId),
      ]);

      const character = verifyIfIsFavorite(characterResult.results[0]);

      setCharacterDetails(character);
      setComics(comicResult.results);
    },
    [verifyIfIsFavorite],
  );

  const handleAddOrRemoveFavorite = useCallback((): void => {
    if (characterDetails?.isFavorite) {
      removeFavorite(Number(id));
    } else {
      saveFavorite(characterDetails as CharacterModel);
    }

    const updatedCharacter = verifyIfIsFavorite(
      characterDetails as CharacterModel,
    );
    setCharacterDetails(updatedCharacter);
  }, [characterDetails, id, removeFavorite, saveFavorite, verifyIfIsFavorite]);

  useEffect(() => {
    const getCharacterDetails = async (): Promise<void> => {
      try {
        await remoteConsultAndSetInState(id);
      } catch {
        toast.error('Erro ao obter o personagem');
      }
    };

    getCharacterDetails();
  }, [id, remoteConsultAndSetInState]);

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
                  handleAddOrRemoveFavorite={handleAddOrRemoveFavorite}
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
