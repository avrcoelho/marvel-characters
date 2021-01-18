import { useState } from 'react';

import { useCharacter } from '../../hooks/context/character';

import { ReactComponent as Hearth } from '../../../../assets/svgs/hearth-sm.svg';
import { ReactComponent as Hero } from '../../../../assets/svgs/hero.svg';
import { ReactComponent as ToggleLeft } from '../../../../assets/svgs/toggle-left.svg';
import { ReactComponent as ToggleRight } from '../../../../assets/svgs/toggle-right.svg';
import { Container } from './styles';

const ToggleAndAmount = (): JSX.Element => {
  const { characters, handleToggleOption, option } = useCharacter();

  return (
    <Container>
      <span className="amount">
        Encontrado(s) {characters?.count || 0} herói(s)
      </span>

      <div className="toggle-container">
        <div className="option">
          <Hero />
          <span className="hidden-mobile">Ordenar por nome - </span> A/Z
        </div>

        <button type="button" onClick={handleToggleOption}>
          {option === 'orderByName' ? <ToggleLeft /> : <ToggleRight />}
        </button>

        <div className="option">
          <Hearth /> <span className="hidden-mobile">Somente favoritos</span>
        </div>
      </div>
    </Container>
  );
};

export default ToggleAndAmount;
