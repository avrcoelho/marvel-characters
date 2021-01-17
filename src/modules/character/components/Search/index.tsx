import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

import { ReactComponent as SearchIcon } from '../../../../assets/svgs/search.svg';
import { useDebounce } from '../../../../shared/hooks/useDebounce';
import { useCharacter } from '../../hooks/context/character';

import { Container } from './styles';

const Search = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchValue = useDebounce({ value: searchValue, delay: 500 });
  const { getCharacters } = useCharacter();

  useEffect(() => {
    const search = async (): Promise<void> => {
      if (typeof debouncedSearchValue === 'string') {
        setIsLoading(true);

        await getCharacters(debouncedSearchValue);

        setIsLoading(false);
      }
    };

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
        onChange={event => setSearchValue(event.target.value)}
      />

      {isLoading && (
        <FaSpinner size={19} color="#FF1510" className="icon-spin" />
      )}
    </Container>
  );
};

export default Search;
