import { useEffect } from 'react';

import { useCharacter } from '../../hooks/context/character';
import Header from '../../components/headers/Home';

import { Container } from './styles';

const Home = (): JSX.Element => {
  const { getCharacters, characters } = useCharacter();

  useEffect(() => {
    getCharacters();
  }, [getCharacters]);

  return (
    <>
      <Header />
      <Container>
        <h1 className="title">Explore o universo</h1>

        <p className="text">
          Mergulhe no domínio deslumbrantee todos os personagens clássicos que
          voce ama - e aqueles que você descobrirá em breve!
        </p>
      </Container>
    </>
  );
};

export default Home;
