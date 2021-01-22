import { createContext, useState, useContext, useCallback } from 'react';
import { toast } from 'react-toastify';

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
  saveFavorite(character: CharacterModel): void;
  removeFavorite(characterId: number): void;
  getCharactersOrderByName(search?: string): Promise<void>;
  getFavoriteCharacters(): void;
  setOption(value: IOptionType): void;
  setSearchValue(value: string): void;
  option: IOptionType;
  searchValue: string | undefined;
  isLoading: boolean;
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
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [option, setOption] = useState<IOptionType>('orderByName');
  const [isLoading, setIsLoading] = useState(false);

  const getCharactersOrderByName = useCallback(
    async (search?: string): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await getCharactersService.execute(search);
        setCharacters(response);
      } catch {
        toast.error('Erro ao obter os personagens');
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

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
      try {
        saveFavoriteCharacterService.execute(character);
        updateCharacterState({ characterId: character.id, isFavorite: true });
      } catch (error) {
        toast.error(error.message);
      }
    },
    [updateCharacterState],
  );

  const removeFavorite = useCallback(
    (characterId: number): void => {
      removeFavoriteCharacterService.execute(characterId);

      if (option === 'favorites') {
        getFavoriteCharacters();

        return;
      }

      updateCharacterState({ characterId, isFavorite: false });
    },
    [getFavoriteCharacters, option, updateCharacterState],
  );

  return (
    <CharacterContext.Provider
      value={{
        characters,
        option,
        searchValue,
        saveFavorite,
        removeFavorite,
        getCharactersOrderByName,
        getFavoriteCharacters,
        setOption,
        setSearchValue,
        isLoading,
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
