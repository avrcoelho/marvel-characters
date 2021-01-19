import { createContext, useState, useContext, useCallback } from 'react';

import {
  CharacterDataContainerModel,
  CharacterModel,
} from '../../models/Character.model';
import {
  getCharactersService,
  getFavoritesCharactersService,
  saveFavoriteCharacterService,
  removeFavoriteCharacterService,
} from '../../services';

type IOptionType = 'orderByName' | 'favorites';

interface CharacterContextData {
  characters: CharacterDataContainerModel | null;
  setSearchValue(value: string | null): void;
  setOption(value: IOptionType): void;
  saveFavorite(character: CharacterModel): void;
  removeFavorite(characterId: number): void;
  getCharactersOrderByName(): Promise<void>;
  getFavoriteCharacters(): void;
  option: IOptionType;
}

interface UpdateCharacterStateParams {
  characterId: number;
  isFavorite: boolean;
}

const CharacterContext = createContext<CharacterContextData>(
  {} as CharacterContextData,
);

export const CharacterProvider: React.FC = ({ children }) => {
  const [
    characters,
    setCharacters,
  ] = useState<CharacterDataContainerModel | null>(null);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [option, setOption] = useState<IOptionType>('orderByName');

  const getCharactersOrderByName = useCallback(async (): Promise<void> => {
    const response = await getCharactersService.execute(searchValue);

    if (response) {
      setCharacters(response);
    }
  }, [searchValue]);

  const getFavoriteCharacters = useCallback((): void => {
    const favorites = getFavoritesCharactersService.execute(
      searchValue,
    ) as CharacterDataContainerModel;

    setCharacters(favorites);
  }, [searchValue]);

  const updateCharacterState = useCallback(
    ({ characterId, isFavorite }: UpdateCharacterStateParams): void => {
      setCharacters(
        prevState =>
          prevState && {
            ...prevState,
            results: prevState?.results.map(character => {
              if (character.id === characterId) {
                return { ...character, isFavorite };
              }

              return character;
            }),
          },
      );
    },
    [],
  );

  const saveFavorite = useCallback(
    (character: CharacterModel): void => {
      saveFavoriteCharacterService.execute(character);

      updateCharacterState({ characterId: character.id, isFavorite: true });
    },
    [updateCharacterState],
  );

  const removeFavorite = useCallback(
    (characterId: number): void => {
      const favorites = removeFavoriteCharacterService.execute(characterId);

      if (option === 'favorites') {
        setCharacters(favorites as CharacterDataContainerModel);

        return;
      }

      updateCharacterState({ characterId, isFavorite: false });
    },
    [option, updateCharacterState],
  );

  return (
    <CharacterContext.Provider
      value={{
        characters,
        setSearchValue,
        setOption,
        option,
        saveFavorite,
        removeFavorite,
        getCharactersOrderByName,
        getFavoriteCharacters,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export function useCharacter(): CharacterContextData {
  const context = useContext(CharacterContext);

  return context;
}
