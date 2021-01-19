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

type IOptionType = 'orderByName' | 'favorites';

interface CharacterContextData {
  characters: CharacterDataContainerModel | null;
  setSearchValue(value: string | null): void;
  handleToggleOption(): void;
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
  const [option, setOption] = useState<IOptionType>('orderByName');

  const getCharactersOrderByName = useCallback(
    async (search): Promise<void> => {
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

  const updateCharacterState = ({
    characterId,
    isFavorite,
  }: UpdateCharacterStateParams): void => {
    setCharacters(prevState => {
      const results = prevState?.results.map(character => {
        if (character.id === characterId) {
          return { ...character, isFavorite };
        }

        return character;
      });

      Object.assign(prevState, { results });

      return prevState;
    });
  };

  const saveFavorite = useCallback((character: CharacterModel): void => {
    saveFavoriteCharacterService.execute(character);

    updateCharacterState({ characterId: character.id, isFavorite: true });
  }, []);

  const removeFavorite = useCallback(
    (characterId: number): void => {
      const favorites = removeFavoriteCharacterService.execute(characterId);

      if (option === 'favorites') {
        setCharacters(favorites as CharacterDataContainerModel);

        return;
      }

      updateCharacterState({ characterId, isFavorite: false });
    },
    [option],
  );

  useEffect(() => {
    if (option === 'orderByName') {
      getCharactersOrderByName(searchValue);
    } else {
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
