import { useEffect } from 'react';

import Header from '../../components/Headers/Home';
import ListCharacters from '../../components/Lists/Characters';
import Search from '../../components/Search';
import ToggleAndAmount from '../../components/ToggleAndAmount';
import { useCharacter } from '../../hooks/context/character';

import { Container } from './styles';

const Home = (): JSX.Element => {
  const { getFavoriteCharacters } = useCharacter();

  useEffect(() => {
    getFavoriteCharacters();
  }, [getFavoriteCharacters]);

  return (
    <>
      <Header />
      <Container>
        <h1 className="title">Explore o universo</h1>

        <p className="text">
          Mergulhe no domínio deslumbrantee todos os personagens clássicos que
          voce ama - e aqueles que você descobrirá em breve!
        </p>

        <Search />
        <ToggleAndAmount />
        <ListCharacters />
      </Container>
    </>
  );
};

export default Home;
