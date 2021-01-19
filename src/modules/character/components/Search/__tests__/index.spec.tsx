import { screen, render, fireEvent, act } from '@testing-library/react';

import Search from '..';

const mockGetCharactersOrderByName = jest.fn();
const mockGetFavoriteCharacters = jest.fn();
const mockSetSearchValue = jest.fn();
const mockOption = jest.fn();
const mockSearchValue = jest.fn();

jest.mock('../../../hooks/context/character', () => {
  return {
    useCharacter: () => ({
      getCharactersOrderByName: mockGetCharactersOrderByName,
      getFavoriteCharacters: mockGetFavoriteCharacters,
      option: mockOption(),
      searchValue: mockSearchValue(),
      setSearchValue: mockSetSearchValue,
    }),
  };
});

const runInterval = async (): Promise<any> => {
  await new Promise(r => setTimeout(r, 500));
};

describe('Search', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should be able to update search value', () => {
    mockOption.mockReturnValue('orderByName');
    render(<Search />);
    const inputElement = screen.getByRole('textbox');

    act(() => {
      fireEvent.change(inputElement, { target: { value: 'test' } });

      jest.advanceTimersByTime(500);
      runInterval();
    });

    expect(mockSetSearchValue).toHaveBeenCalledWith('test');
  });

  it('should be able to search characters in orderByName', async () => {
    mockOption.mockReturnValue('orderByName');
    mockSearchValue.mockReturnValue('john');
    render(<Search />);
    const inputElement = screen.getByRole('textbox');

    act(() => {
      fireEvent.change(inputElement, { target: { value: 'test' } });

      jest.advanceTimersByTime(500);
      runInterval();
    });

    expect(mockGetCharactersOrderByName).toHaveBeenCalled();
  });

  it('should be able to search characters in favorites', async () => {
    mockOption.mockReturnValue('favorites');
    mockSearchValue.mockReturnValue('john');
    render(<Search />);
    const inputElement = screen.getByRole('textbox');

    act(() => {
      fireEvent.change(inputElement, { target: { value: 'test' } });

      jest.advanceTimersByTime(500);
      runInterval();
    });

    expect(mockGetFavoriteCharacters).toHaveBeenCalled();
  });
});
