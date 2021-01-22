import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

import { CharacterModel } from '../models/Character.model';
import { ComicModel } from '../models/Comic.model';
import {
  getCharacterComicsService,
  getFavoritesCharactersService,
  getCharacterService,
} from '../services';
import { useCharacter } from './context/character';

interface CharacterDetailsData {
  getCharacterDetails: (id: string) => Promise<void>;
  addOrRemoveFavorite: () => void;
  characterDetails: CharacterModel | null;
  comics: ComicModel[];
  dateOfLastComic: string | null;
}

export const useCharacterDetails = (): CharacterDetailsData => {
  const [
    characterDetails,
    setCharacterDetails,
  ] = useState<CharacterModel | null>(null);
  const [comics, setComics] = useState<ComicModel[]>([]);
  const [dateOfLastComic, setDateOfLastComic] = useState<string | null>(null);

  const { saveFavorite, removeFavorite } = useCharacter();

  const verifyIfIsFavorite = useCallback((characterId: number): boolean => {
    const favorites = getFavoritesCharactersService.execute();
    const isFavorite = favorites.results.some(
      favorite => favorite.id === characterId,
    );

    return isFavorite;
  }, []);

  const remoteConsultAndSetInState = useCallback(
    async (characterId: string): Promise<void> => {
      const [characterResult, comicResult] = await Promise.all([
        getCharacterService.execute(characterId),
        getCharacterComicsService.execute(characterId),
      ]);

      const isFavorite = verifyIfIsFavorite(characterResult.results[0].id);

      setCharacterDetails({ ...characterResult.results[0], isFavorite });
      setComics(comicResult.results);

      const getDateOfLastComic = comicResult.results[0]?.dates.pop()?.date;
      setDateOfLastComic(getDateOfLastComic || null);
    },
    [verifyIfIsFavorite],
  );

  const addOrRemoveFavorite = useCallback((): void => {
    if (characterDetails?.isFavorite) {
      removeFavorite(Number(characterDetails.id));
    } else {
      saveFavorite(characterDetails as CharacterModel);
    }

    const isFavorite = verifyIfIsFavorite(characterDetails?.id as number);

    setCharacterDetails(prevState => prevState && { ...prevState, isFavorite });
  }, [characterDetails, removeFavorite, saveFavorite, verifyIfIsFavorite]);

  const getCharacterDetails = async (id: string): Promise<void> => {
    try {
      await remoteConsultAndSetInState(id);
    } catch {
      toast.error('Erro ao obter o personagem');
    }
  };

  return {
    addOrRemoveFavorite,
    getCharacterDetails,
    characterDetails,
    comics,
    dateOfLastComic,
  };
};
