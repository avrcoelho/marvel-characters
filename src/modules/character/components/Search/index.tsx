import { Container } from './styles';
import { ReactComponent as SearchIcon } from '../../../../assets/svgs/search.svg';

const Search = (): JSX.Element => {
  return (
    <Container>
      <SearchIcon />

      <input
        type="text"
        name="search"
        placeholder="Procure por herois"
        autoComplete="off"
      />
    </Container>
  );
};

export default Search;
