import { render, screen, fireEvent } from '@testing-library/react';

import Characters from '..';

const mockSaveFavorite = jest.fn();
const mockRemoveFavorite = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});
jest.mock('../../../../hooks/context/character', () => {
  return {
    useCharacter: () => ({
      saveFavorite: mockSaveFavorite,
      removeFavorite: mockRemoveFavorite,
      characters: {
        results: [
          {
            id: 1,
            name: 'John Doe',
            thumbnail: {
              path: 'path',
              extension: 'jpg',
            },
          },
          {
            id: 2,
            name: 'John Doe',
            isFavorite: true,
            thumbnail: {
              path: 'path',
              extension: 'jpg',
            },
          },
        ],
      },
    }),
  };
});

describe('Characters List', () => {
  it('should be able to render list items', () => {
    render(<Characters />);

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('should be able to add character on the favorites', () => {
    render(<Characters />);
    const buttonElement = screen.getAllByRole('button')[0];

    fireEvent.click(buttonElement);

    expect(mockSaveFavorite).toHaveBeenCalled();
  });

  it('should be able to remove character on the favorites', () => {
    render(<Characters />);
    const buttonElement = screen.getAllByRole('button')[1];

    fireEvent.click(buttonElement);

    expect(mockRemoveFavorite).toHaveBeenCalled();
  });
});
