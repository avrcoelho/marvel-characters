import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Header from '../../components/Headers/Character';
import { CharacterModel } from '../../models/Character.model';
import { ComicModel } from '../../models/Comic.model';
import { getCharacterService, getCharacterComicsService } from '../../services';

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

  return <Header />;
};

export default Character;
