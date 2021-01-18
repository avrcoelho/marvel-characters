import { screen, render, fireEvent } from '@testing-library/react';

import ToggleAndAmount from '..';

const mockHandleToggleOption = jest.fn();
const mockCharacters = jest.fn();
const mockOption = jest.fn();

jest.mock('../../../hooks/context/character', () => {
  return {
    useCharacter: () => ({
      handleToggleOption: mockHandleToggleOption,
      characters: mockCharacters(),
      option: mockOption(),
    }),
  };
});

describe('ToggleAndAmount', () => {
  it('should be able to call function handleToggleOption', () => {
    render(<ToggleAndAmount />);
    const buttonElement = screen.getByRole('button');

    fireEvent.click(buttonElement);

    expect(mockHandleToggleOption).toHaveBeenCalled();
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
