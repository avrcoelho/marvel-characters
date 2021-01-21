import { render, screen } from '@testing-library/react';

import Home from '..';

const mockGetCharactersOrderByName = jest.fn();
const mockSearchValue = jest.fn();
const mockOption = jest.fn();

jest.mock('../../../hooks/context/character', () => {
  return {
    useCharacter: () => ({
      getCharactersOrderByName: mockGetCharactersOrderByName,
      searchValue: mockSearchValue(),
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

  it('should be able to call function getFavoriteCharacters when search value not exists', () => {
    mockSearchValue.mockReturnValue(undefined);
    mockOption.mockReturnValue('orderByName');
    render(<Home />);

    expect(mockGetCharactersOrderByName).toHaveBeenCalled();
  });

  it('should not be able call function getFavoriteCharacters when exists search value', () => {
    mockSearchValue.mockReturnValue('john');
    render(<Home />);

    expect(mockGetCharactersOrderByName).not.toHaveBeenCalled();
  });
});
