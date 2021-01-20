import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Header from '../../components/Headers/Character';
import CharacterDetails from '../../components/CharacterDetails';
import { CharacterModel } from '../../models/Character.model';
import { ComicModel } from '../../models/Comic.model';
import { getCharacterService, getCharacterComicsService } from '../../services';

import { MainContainer } from './styles';

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

  const removeConsultAndSetInState = async (
    characterId: string,
  ): Promise<void> => {
    const [characterResult, comicResult] = await Promise.all([
      getCharacterService.execute(characterId),
      getCharacterComicsService.execute(characterId),
    ]);

    setCharacterDetails(characterResult.results[0]);
    setComics(comicResult.results);
  };

  useEffect(() => {
    const getCharacterDetails = async (): Promise<void> => {
      try {
        await removeConsultAndSetInState(id);
      } catch {
        toast.error('Erro ao obter o personagem');
      }
    };

    getCharacterDetails();
  }, [id]);

  return (
    <>
      <Header />
      <MainContainer>
        <div className="content">
          <CharacterDetails />

          <img
            src="http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0.jpg"
            alt=""
          />
        </div>
      </MainContainer>
    </>
  );
};

export default Character;
