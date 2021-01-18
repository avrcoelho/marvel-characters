import { screen, render, fireEvent, act } from '@testing-library/react';

import Search from '..';

const mockSetSearchValue = jest.fn();

jest.mock('../../../hooks/context/character', () => {
  return {
    useCharacter: () => ({
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

  it('should be able to search characters', async () => {
    render(<Search />);
    const inputElement = screen.getByRole('textbox');

    act(() => {
      fireEvent.change(inputElement, { target: { value: 'test' } });

      jest.advanceTimersByTime(500);
      runInterval();
    });

    expect(mockSetSearchValue).toHaveBeenCalledWith('test');
  });

  it('should not be able to search characters', () => {
    render(<Search />);
    const inputElement = screen.getByRole('textbox');

    act(() => {
      fireEvent.change(inputElement, { target: { value: '' } });

      jest.advanceTimersByTime(500);
      runInterval();
    });

    expect(mockSetSearchValue).not.toHaveBeenCalled();
  });
});
