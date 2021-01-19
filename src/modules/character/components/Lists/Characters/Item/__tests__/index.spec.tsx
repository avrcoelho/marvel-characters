import { render, screen, fireEvent } from '@testing-library/react';

import Item from '..';

const mockAddOrRemoveFavorite = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Characters List item', () => {
  const props = {
    character: {
      id: 1,
      name: 'John Doe',
      thumbnail: {
        path: 'path',
        extension: 'jpg',
      },
    },
    addOrRemoveFavorite: mockAddOrRemoveFavorite,
  };

  it('should be able to add in favorites', () => {
    render(<Item {...props} />);
    const buttonElement = screen.getByRole('button');

    fireEvent.click(buttonElement);

    expect(mockAddOrRemoveFavorite).toHaveBeenCalledWith(true);
  });

  it('should be able to remove of favorites', () => {
    Object.assign(props.character, { isFavorite: true });
    render(<Item {...props} />);
    const buttonElement = screen.getByRole('button');

    fireEvent.click(buttonElement);

    expect(mockAddOrRemoveFavorite).toHaveBeenCalledWith(false);
  });

  it('should be able to render hearth border icon', () => {
    Object.assign(props.character, { isFavorite: true });
    render(<Item {...props} />);

    expect(screen.getByTestId('hearth')).toBeTruthy();
  });

  it('should be able to render hearth icon', () => {
    Object.assign(props.character, { isFavorite: false });
    render(<Item {...props} />);

    expect(screen.getByTestId('hearth-border')).toBeTruthy();
  });
});
