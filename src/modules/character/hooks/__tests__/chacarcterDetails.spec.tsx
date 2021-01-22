import { renderHook, act } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';

import { useCharacterDetails } from '../characterDetails';
import {
  getCharacterComicsService,
  getFavoritesCharactersService,
  getCharacterService,
} from '../../services';

const mockSaveFavorite = jest.fn();
const mockRemoveFavorite = jest.fn();
const spyGetCharacterService = jest.spyOn(getCharacterService, 'execute');
const spyGetCharacterComicsService = jest.spyOn(
  getCharacterComicsService,
  'execute',
);
const spyGetFavoritesCharactersService = jest.spyOn(
  getFavoritesCharactersService,
  'execute',
);

jest.mock('../context/character', () => {
  return {
    useCharacter: () => ({
      saveFavorite: mockSaveFavorite,
      removeFavorite: mockRemoveFavorite,
    }),
  };
});

describe('character details Hook', () => {
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
        series: {
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
    spyGetCharacterService.mockImplementationOnce((): any => {
      return responseCharacter;
    });
    spyGetCharacterComicsService.mockImplementationOnce((): any => {
      return responseComic;
    });
    spyGetFavoritesCharactersService.mockImplementationOnce((): any => {
      return {
        results: responseCharacter.results,
      };
    });
    const { result, waitForNextUpdate } = renderHook(() =>
      useCharacterDetails(),
    );

    result.current.getCharacterDetails('123');

    expect(spyGetCharacterService).toHaveBeenCalledWith('123');
    await waitForNextUpdate();
  });

  it('should be able to get comic', async () => {
    spyGetCharacterService.mockImplementationOnce((): any => {
      return responseCharacter;
    });
    spyGetCharacterComicsService.mockImplementationOnce((): any => {
      return responseComic;
    });
    spyGetFavoritesCharactersService.mockImplementationOnce((): any => {
      return {
        results: responseCharacter.results,
      };
    });
    const { result, waitForNextUpdate } = renderHook(() =>
      useCharacterDetails(),
    );

    result.current.getCharacterDetails('123');

    expect(spyGetCharacterComicsService).toHaveBeenCalledWith('123');
    await waitForNextUpdate();
  });

  it('should be able to show alert', async () => {
    spyGetCharacterService.mockImplementationOnce((): any => {
      throw new Error();
    });
    spyGetCharacterComicsService.mockImplementationOnce((): any => {
      throw new Error();
    });
    spyGetFavoritesCharactersService.mockImplementationOnce((): any => {
      return {
        results: responseCharacter.results,
      };
    });
    const spyToast = jest.spyOn(toast, 'error');
    const { result } = renderHook(() => useCharacterDetails());

    result.current.getCharacterDetails('123');

    await waitFor(() => {
      expect(spyToast).toHaveBeenCalled();
    });
  });

  it('should be able to add character on the favorites', async () => {
    spyGetCharacterService.mockImplementationOnce((): any => {
      return responseCharacter;
    });
    spyGetCharacterComicsService.mockImplementationOnce((): any => {
      return responseComic;
    });
    spyGetFavoritesCharactersService.mockImplementation((): any => {
      return {
        results: [{ ...responseCharacter.results[0], id: 123 }],
      };
    });
    const { result, waitForNextUpdate } = renderHook(() =>
      useCharacterDetails(),
    );
    result.current.getCharacterDetails('123');
    await waitForNextUpdate();

    act(() => {
      result.current.addOrRemoveFavorite();
    });

    expect(mockSaveFavorite).toHaveBeenCalled();
  });

  it('should be able to remove character on the favorites', async () => {
    responseCharacter.results[0].id = 123;
    spyGetCharacterService.mockImplementationOnce((): any => {
      return responseCharacter;
    });
    spyGetCharacterComicsService.mockImplementationOnce((): any => {
      return responseComic;
    });
    spyGetFavoritesCharactersService.mockImplementation((): any => {
      return {
        results: [{ ...responseCharacter.results[0], id: 123 }],
      };
    });
    const { result, waitForNextUpdate } = renderHook(() =>
      useCharacterDetails(),
    );
    result.current.getCharacterDetails('123');
    await waitForNextUpdate();

    act(() => {
      result.current.addOrRemoveFavorite();
    });

    expect(mockRemoveFavorite).toHaveBeenCalled();
  });
});
