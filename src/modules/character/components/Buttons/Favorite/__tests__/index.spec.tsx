import { render, screen, fireEvent } from '@testing-library/react';

import Favorite from '..';

const mockSaveFavorite = jest.fn();
const mockRemoveFavorite = jest.fn();

jest.mock('../../../../hooks/context/character', () => {
  return {
    useCharacter: () => ({
      saveFavorite: mockSaveFavorite,
      removeFavorite: mockRemoveFavorite,
    }),
  };
});

describe('Button favorite', () => {
  const props = {
    character: {
      id: 1,
      name: 'John Doe',
      thumbnail: {
        path: 'path',
        extension: 'jpg',
      },
      comics: {
        returned: 3,
      },
      description: 'description',
      isFavorite: false,
    },
  };

  it('should be able to add character on the favorites', () => {
    render(<Favorite {...props} />);
    const buttonElement = screen.getByRole('button');

    fireEvent.click(buttonElement);

    expect(mockSaveFavorite).toHaveBeenCalled();
  });

  it('should be able to remove character on the favorites', () => {
    Object.assign(props.character, { isFavorite: true });
    render(<Favorite {...props} />);
    const buttonElement = screen.getByRole('button');

    fireEvent.click(buttonElement);

    expect(mockRemoveFavorite).toHaveBeenCalled();
  });

  it('should be able to render hearth border icon', () => {
    Object.assign(props.character, { isFavorite: true });
    render(<Favorite {...props} />);

    expect(screen.getByTestId('hearth')).toBeTruthy();
  });

  it('should be able to render hearth icon', () => {
    Object.assign(props.character, { isFavorite: false });
    render(<Favorite {...props} />);

    expect(screen.getByTestId('hearth-border')).toBeTruthy();
  });
});
