import { act, render, screen, fireEvent } from '@testing-library/react';

import Character from '..';

const promise = Promise.resolve();

const mockGetCharacterDetails = jest.fn();
const mockAddOrRemoveFavorite = jest.fn();

const characterDetails = {
  id: 1,
  name: 'John Doe',
  thumbnail: {
    path: 'path',
    extension: 'jpg',
  },
  comics: {
    returned: 3,
  },
  series: {
    returned: 3,
  },
  description: 'description',
  isFavorite: false,
};

const comics: any[] = [];

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});
jest.mock('../../../hooks/characterDetails', () => {
  return {
    useCharacterDetails: () => ({
      getCharacterDetails: mockGetCharacterDetails,
      addOrRemoveFavorite: mockAddOrRemoveFavorite,
      characterDetails,
      comics,
    }),
  };
});
jest.mock('react-router-dom', () => {
  return {
    useParams: () => ({
      id: '123',
    }),
  };
});

describe('Character page', () => {
  it('should be able to get character', async () => {
    render(<Character />);

    expect(mockGetCharacterDetails).toHaveBeenCalledWith('123');
  });

  it('should be able to add or remove character on favorites', async () => {
    render(<Character />);
    await act(() => promise);
    const buttonElement = screen.getByRole('button');

    fireEvent.click(buttonElement);

    expect(mockAddOrRemoveFavorite).toHaveBeenCalled();
  });
});
