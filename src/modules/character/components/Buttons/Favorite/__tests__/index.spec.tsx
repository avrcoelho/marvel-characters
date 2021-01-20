import { render, screen, fireEvent } from '@testing-library/react';

import Favorite from '..';

const mockOnClick = jest.fn();

describe('Button favorite', () => {
  const props = {
    isFavorite: true,
    onClick: mockOnClick,
  };

  it('should be able to remove of favorites', () => {
    render(<Favorite {...props} />);
    const buttonElement = screen.getByRole('button');

    fireEvent.click(buttonElement);

    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should be able to render hearth border icon', () => {
    render(<Favorite {...props} />);

    expect(screen.getByTestId('hearth')).toBeTruthy();
  });

  it('should be able to render hearth icon', () => {
    Object.assign(props, { isFavorite: false });
    render(<Favorite {...props} />);

    expect(screen.getByTestId('hearth-border')).toBeTruthy();
  });
});
