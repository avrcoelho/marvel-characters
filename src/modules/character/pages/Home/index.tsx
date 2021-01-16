import { useEffect } from 'react';

import { useCharacter } from '../../hooks/context/character';

const Home = (): JSX.Element => {
  const { getCharacters, characters } = useCharacter();

  useEffect(() => {
    getCharacters();
  }, [getCharacters]);

  return <h1>Hero Home</h1>;
};

export default Home;
