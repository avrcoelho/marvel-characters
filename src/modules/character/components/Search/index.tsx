import { useEffect, useState } from 'react';

import { ReactComponent as SearchIcon } from '../../../../assets/svgs/search.svg';
import { useDebounce } from '../../../../shared/hooks/useDebounce';
import { useCharacter } from '../../hooks/context/character';

import { Container } from './styles';

const Search = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchValue = useDebounce({ value: searchValue, delay: 500 });
  const { getCharacters } = useCharacter();

  useEffect(() => {
    async function search(): Promise<void> {
      if (debouncedSearchValue) {
        setIsLoading(true);

        await getCharacters(debouncedSearchValue);

        setIsLoading(false);
      }
    }

    search();
  }, [debouncedSearchValue, getCharacters]);

  return (
    <Container>
      <SearchIcon />

      <input
        type="text"
        name="search"
        placeholder="Procure por herois"
        autoComplete="off"
        value={searchValue}
        onChange={event => setSearchValue(event.target.value)}
      />
    </Container>
  );
};

export default Search;
