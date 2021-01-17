import { useEffect } from 'react';

import { useCharacter } from '../../hooks/context/character';
import Header from '../../components/Headers/Home';

const Home = (): JSX.Element => {
  const { getCharacters, characters } = useCharacter();

  useEffect(() => {
    getCharacters();
  }, [getCharacters]);

  return <Header />;
};

export default Home;
