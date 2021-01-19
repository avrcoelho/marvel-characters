import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';

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

type IOptionType = 'orderByName' | 'favorites' | nulo;

interface CharacterContextData {
  characters: CharacterDataContainerModel | null;
  setSearchValue(value: string | null): void;
  handleToggleOption(): void;
  getCharactersOrderByName(search?: string) => Promise<void>;
  saveFavorite(character: CharacterModel): void;
  removeFavorite(characterId: number): void;
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
  const [option, setOption] = useState<IOptionType>(null);

  const getCharactersOrderByName = useCallback(
    async (search?: string): Promise<void> => {
      const response = await getCharactersService.execute(search);

      if (response) {
        setCharacters(response);
      }
    },
    [],
  );

  const getFavoriteCharacters = useCallback(async (search): Promise<void> => {
    const favorites = getFavoritesCharactersService.execute(
      search,
    ) as CharacterDataContainerModel;

    setCharacters(favorites);
  }, []);

  const handleToggleOption = (): void => {
    setOption(prevState =>
      prevState === 'orderByName' ? 'favorites' : 'orderByName',
    );
  };

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

  useEffect(() => {
    if (option === 'orderByName') {
      getCharactersOrderByName(searchValue);
    }
    if (option === 'favorites') {
      getFavoriteCharacters(searchValue);
    }
  }, [getCharactersOrderByName, getFavoriteCharacters, option, searchValue]);

  return (
    <CharacterContext.Provider
      value={{
        characters,
        setSearchValue,
        option,
        handleToggleOption,
        saveFavorite,
        removeFavorite,
        getCharactersOrderByName,
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
