import {
  act,
  render,
  waitFor,
  screen,
  fireEvent,
} from '@testing-library/react';
import { toast } from 'react-toastify';

import {
  getCharacterService,
  getCharacterComicsService,
  getFavoritesCharactersService,
} from '../../../services';
import Character from '..';

const promise = Promise.resolve();

const mockSaveFavorite = jest.fn();
const mockRemoveFavorite = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});
jest.mock('../../../hooks/context/character', () => {
  return {
    useCharacter: () => ({
      saveFavorite: mockSaveFavorite,
      removeFavorite: mockRemoveFavorite,
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
  const responseCharacter = {
    offset: 0,
    limit: 20,
    total: 1493,
    count: 20,
    results: [
      {
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
    ],
  };
  const responseComic = {
    offset: 0,
    limit: 20,
    total: 1493,
    count: 20,
    results: [],
  };
  it('should be able to get character', async () => {
    const spyGetCharacterService = jest
      .spyOn(getCharacterService, 'execute')
      .mockImplementation((): any => {
        return responseCharacter;
      });
    jest
      .spyOn(getCharacterComicsService, 'execute')
      .mockImplementation((): any => {
        return responseComic;
      });
    jest
      .spyOn(getFavoritesCharactersService, 'execute')
      .mockImplementation((): any => {
        return {
          results: responseCharacter.results,
        };
      });
    render(<Character />);

    expect(spyGetCharacterService).toHaveBeenCalledWith('123');
    await act(() => promise);
  });

  it('should be able to get comic', async () => {
    jest.spyOn(getCharacterService, 'execute').mockImplementation((): any => {
      return responseCharacter;
    });
    const spyGetCharacterComicsService = jest
      .spyOn(getCharacterComicsService, 'execute')
      .mockImplementation((): any => {
        return responseComic;
      });
    jest
      .spyOn(getFavoritesCharactersService, 'execute')
      .mockImplementation((): any => {
        return {
          results: responseCharacter.results,
        };
      });
    render(<Character />);

    expect(spyGetCharacterComicsService).toHaveBeenCalledWith('123');
    await act(() => promise);
  });

  it('should be able to show alert', async () => {
    jest
      .spyOn(getCharacterComicsService, 'execute')
      .mockImplementation((): any => {
        throw new Error();
      });
    jest
      .spyOn(getCharacterComicsService, 'execute')
      .mockImplementation((): any => {
        throw new Error();
      });
    jest
      .spyOn(getFavoritesCharactersService, 'execute')
      .mockImplementation((): any => {
        return {
          results: responseCharacter.results,
        };
      });
    const spyToast = jest.spyOn(toast, 'error');
    render(<Character />);

    await waitFor(() => {
      expect(spyToast).toHaveBeenCalled();
    });
  });

  it('should be able to add character on the favorites', async () => {
    jest.spyOn(getCharacterService, 'execute').mockImplementation((): any => {
      return responseCharacter;
    });
    jest
      .spyOn(getCharacterComicsService, 'execute')
      .mockImplementation((): any => {
        return responseComic;
      });
    jest
      .spyOn(getFavoritesCharactersService, 'execute')
      .mockImplementation((): any => {
        return {
          results: [{ ...responseCharacter.results[0], id: 11 }],
        };
      });
    render(<Character />);
    await act(() => promise);
    const buttonElement = screen.getByRole('button');

    fireEvent.click(buttonElement);

    expect(mockSaveFavorite).toHaveBeenCalled();
  });

  it('should be able to remove character on the favorites', async () => {
    jest.spyOn(getCharacterService, 'execute').mockImplementation((): any => {
      return responseCharacter;
    });
    jest
      .spyOn(getCharacterComicsService, 'execute')
      .mockImplementation((): any => {
        return responseComic;
      });
    jest
      .spyOn(getFavoritesCharactersService, 'execute')
      .mockImplementation((): any => {
        return {
          results: responseCharacter.results,
        };
      });
    render(<Character />);
    await act(() => promise);
    const buttonElement = screen.getByRole('button');

    fireEvent.click(buttonElement);

    expect(mockRemoveFavorite).toHaveBeenCalled();
  });
});
