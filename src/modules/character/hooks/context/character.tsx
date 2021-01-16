import { createContext, useState, useContext } from 'react';

import { CharacterDataContainerModel } from '../../models/Character.model';
import { getCharactersService } from '../../services';

interface CharacterContextData {
  characters: CharacterDataContainerModel | null;
  getCharacters(serach?: string): Promise<void>;
}

const CharacterContext = createContext<CharacterContextData>(
  {} as CharacterContextData,
);

export const CharacterProvider: React.FC = ({ children }) => {
  const [
    characters,
    setCharacters,
  ] = useState<CharacterDataContainerModel | null>(null);

  const getCharacters = async (search = ''): Promise<void> => {
    const response = await getCharactersService.execute(search);

    if (response) {
      setCharacters(response);
    }
  };

  return (
    <CharacterContext.Provider value={{ characters, getCharacters }}>
      {children}
    </CharacterContext.Provider>
  );
};

export function useCharacter(): CharacterContextData {
  const context = useContext(CharacterContext);

  return context;
}
