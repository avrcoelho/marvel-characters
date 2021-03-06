import { render, screen } from '@testing-library/react';

import Home from '..';

const mockGetCharactersOrderByName = jest.fn();
const mockOption = jest.fn();

jest.mock('../../../hooks/context/character', () => {
  return {
    useCharacter: () => ({
      getCharactersOrderByName: mockGetCharactersOrderByName,
      option: mockOption(),
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

  it('should be able to call function getFavoriteCharacters when option is orderByName', () => {
    mockOption.mockReturnValue('orderByName');
    render(<Home />);

    expect(mockGetCharactersOrderByName).toHaveBeenCalled();
  });

  it('should not be able call function getFavoriteCharacters when option is fovaorite', () => {
    mockOption.mockReturnValue('favorite');
    render(<Home />);

    expect(mockGetCharactersOrderByName).not.toHaveBeenCalled();
  });
});
