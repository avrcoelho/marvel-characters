import { useCallback, useEffect } from 'react';

import { ReactComponent as SearchIcon } from '../../../../assets/svgs/search.svg';
import { useDebounce } from '../../../../shared/hooks/useDebounce';
import { useCharacter } from '../../hooks/context/character';

import { Container } from './styles';

const Search = (): JSX.Element => {
  const {
    getCharactersOrderByName,
    getFavoriteCharacters,
    searchValue,
    setSearchValue,
    option,
  } = useCharacter();
  const { handleDebounce } = useDebounce(500);

  const getCharacters = useCallback(
    async (search: string): Promise<void> => {
      if (option === 'orderByName') {
        setSearchValue(search);
        await getCharactersOrderByName(search);

        return;
      }

      getFavoriteCharacters();
    },
    [getCharactersOrderByName, getFavoriteCharacters, option, setSearchValue],
  );

  useEffect(() => {
    if (typeof searchValue === 'string') {
      handleDebounce(() => getCharacters(searchValue));
    }
  }, [searchValue, getCharacters, handleDebounce]);

  return (
    <Container>
      <SearchIcon />

      <input
        type="text"
        name="search"
        placeholder="Procure por herois"
        autoComplete="off"
        value={searchValue || ''}
        onChange={event => setSearchValue(event.target.value)}
      />
    </Container>
  );
};

export default Search;
