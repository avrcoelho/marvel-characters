import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Header from '../../components/Headers/Character';
import CharacterDetails from '../../components/CharacterDetails';
import { CharacterModel } from '../../models/Character.model';
import { ComicModel } from '../../models/Comic.model';
import {
  getCharacterService,
  getCharacterComicsService,
  getFavoritesCharactersService,
} from '../../services';
import { useCharacter } from '../../hooks/context/character';

import { Container, MainContainer, CharacterNameBg } from './styles';

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

  const updateState = useCallback((): void => {
    setCharacterDetails(
      prevState =>
        prevState && {
          ...prevState,
          isFavorite: !prevState?.isFavorite,
        },
    );
  }, []);

  const handleAddOrReoveRavorite = useCallback((): void => {
    try {
      if (characterDetails?.isFavorite) {
        removeFavorite(Number(id));
      } else {
        saveFavorite(characterDetails as CharacterModel);
      }

      updateState();
    } catch (error) {
      toast.error(error.message);
    }
  }, [characterDetails, id, removeFavorite, saveFavorite, updateState]);

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
    <Container>
      <Header />
      {characterDetails && (
        <MainContainer>
          <div className="content">
            <CharacterDetails
              character={characterDetails}
              handleAddOrReoveRavorite={handleAddOrReoveRavorite}
            />

            <img
              src={`${characterDetails.thumbnail.path}.${characterDetails.thumbnail.extension}`}
              alt={characterDetails.name}
            />
          </div>

          <CharacterNameBg>{characterDetails?.name}</CharacterNameBg>
        </MainContainer>
      )}
    </Container>
  );
};

export default Character;
