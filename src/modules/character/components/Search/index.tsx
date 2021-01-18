import { useEffect, useState } from 'react';

import { ReactComponent as SearchIcon } from '../../../../assets/svgs/search.svg';
import { useDebounce } from '../../../../shared/hooks/useDebounce';
import { useCharacter } from '../../hooks/context/character';

import { Container } from './styles';

const Search = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<string | null>(null);

  const debouncedSearchValue = useDebounce({ value: inputValue, delay: 500 });
  const { setSearchValue } = useCharacter();

  useEffect(() => {
    const search = async (): Promise<void> => {
      if (typeof debouncedSearchValue === 'string') {
        setSearchValue(inputValue);
      }
    };

    search();
  }, [debouncedSearchValue, inputValue, setSearchValue]);

  return (
    <Container>
      <SearchIcon />

      <input
        type="text"
        name="search"
        placeholder="Procure por herois"
        autoComplete="off"
        onChange={event => setInputValue(event.target.value)}
      />
    </Container>
  );
};

export default Search;
