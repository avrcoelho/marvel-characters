import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';

import { CharacterDataContainerModel } from '../../models/Character.model';
import { getCharactersService } from '../../services';

type IOptionType = 'orderByName' | 'favorites';

interface CharacterContextData {
  characters: CharacterDataContainerModel | null;
  setSearchValue(value: string | null): void;
  setOption(value: IOptionType): void;
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
    async (search = ''): Promise<void> => {
      const response = await getCharactersService.execute(search);

      if (response) {
        setCharacters(response);
      }
    },
    [],
  );

  const getFavoriteCharacters = useCallback(
    async (search = ''): Promise<void> => {
      // logic here
    },
    [],
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
      value={{ characters, setOption, setSearchValue }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export function useCharacter(): CharacterContextData {
  const context = useContext(CharacterContext);

  return context;
}
