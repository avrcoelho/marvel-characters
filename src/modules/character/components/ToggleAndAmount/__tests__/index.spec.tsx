import { screen, render, fireEvent } from '@testing-library/react';

import ToggleAndAmount from '..';

const mockSetOption = jest.fn();
const mockCharacters = jest.fn();
const mockOption = jest.fn();
const mockGetCharactersOrderByName = jest.fn();
const mockGetFavoriteCharacters = jest.fn();
const mockSearchValue = jest.fn();

jest.mock('../../../hooks/context/character', () => {
  return {
    useCharacter: () => ({
      getCharactersOrderByName: mockGetCharactersOrderByName,
      getFavoriteCharacters: mockGetFavoriteCharacters,
      setOption: mockSetOption,
      characters: mockCharacters(),
      searchValue: mockSearchValue(),
      option: mockOption(),
    }),
  };
});

describe('ToggleAndAmount', () => {
  it('should be able to call function setOption with favorite', () => {
    mockOption.mockImplementation(() => 'orderByName');
    render(<ToggleAndAmount />);
    const buttonElement = screen.getByRole('button');

    fireEvent.click(buttonElement);

    expect(mockSetOption).toHaveBeenCalledWith('favorites');
  });

  it('should be able to call function setOption with orderByName', () => {
    mockOption.mockImplementation(() => 'favorites');
    render(<ToggleAndAmount />);
    const buttonElement = screen.getByRole('button');

    fireEvent.click(buttonElement);

    expect(mockSetOption).toHaveBeenCalledWith('orderByName');
  });

  it('should be able to have 0 results', () => {
    render(<ToggleAndAmount />);

    expect(screen.getByText(/encontrado\(s\) 0 herói\(s\)/i)).toBeTruthy();
  });

  it('should be able to have 20 results', () => {
    mockCharacters.mockImplementation(() => ({
      count: 20,
    }));
    render(<ToggleAndAmount />);

    expect(screen.getByText(/encontrado\(s\) 20 herói\(s\)/i)).toBeTruthy();
  });

  it('should be able render icon Left', () => {
    mockOption.mockImplementation(() => 'orderByName');
    render(<ToggleAndAmount />);

    expect(screen.getByTestId('icon-left')).toBeTruthy();
  });

  it('should be able render icon tight', () => {
    mockOption.mockImplementation(() => 'favorites');
    render(<ToggleAndAmount />);

    expect(screen.getByTestId('icon-right')).toBeTruthy();
  });
});
