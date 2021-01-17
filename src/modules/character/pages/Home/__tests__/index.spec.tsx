import { render, screen } from '@testing-library/react';

import Home from '..';

jest.mock('../../../hooks/context/character', () => {
  return {
    useCharacter: () => ({
      getCharacters: jest.fn(),
      characters: [],
    }),
  };
});

describe('Home page', () => {
  it('should be able to render title', () => {
    render(<Home />);

    expect(
      screen.getByRole('heading', {
        name: /explore o universo/i,
      }),
    ).toBeTruthy();
  });

  it('should be able to render text', () => {
    render(<Home />);

    expect(
      screen.getByText(
        /mergulhe no domínio deslumbrantee todos os personagens clássicos que voce ama - e aqueles que você descobrirá em breve!/i,
      ),
    ).toBeTruthy();
  });
});
