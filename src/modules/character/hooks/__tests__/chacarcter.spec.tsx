import { renderHook, act } from '@testing-library/react-hooks';
import { toast } from 'react-toastify';

import { useCharacter, CharacterProvider } from '../context/character';
import {
  getCharactersService,
  getFavoritesCharactersService,
  saveFavoriteCharacterService,
} from '../../services/index';

describe('character Hook', () => {
  const character = {
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
  };

  it('should able to call functiom get characters', async () => {
    jest
      .spyOn(getCharactersService, 'execute')
      .mockImplementationOnce((): any => {
        return {
          offset: 0,
          limit: 20,
          total: 1493,
          count: 20,
          results: [],
        };
      });
    const { result, waitForNextUpdate } = renderHook(() => useCharacter(), {
      wrapper: CharacterProvider,
    });

    act(() => {
      result.current.getCharactersOrderByName();
    });
    await waitForNextUpdate();

    expect(result.current.characters).toEqual({
      offset: 0,
      limit: 20,
      total: 1493,
      count: 20,
      results: [],
    });
  });

  it('should able return error when get remote characters', () => {
    jest
      .spyOn(getCharactersService, 'execute')
      .mockImplementationOnce((): any => {
        throw new Error();
      });
    const spyToast = jest.spyOn(toast, 'error');
    const { result } = renderHook(() => useCharacter(), {
      wrapper: CharacterProvider,
    });

    act(() => {
      result.current.getCharactersOrderByName();
    });

    expect(spyToast).toHaveBeenCalled();
  });

  it('should able to call functiom get favorites characters', () => {
    jest
      .spyOn(getFavoritesCharactersService, 'execute')
      .mockImplementationOnce((): any => {
        return {
          count: 20,
          results: [],
        };
      });
    const { result } = renderHook(() => useCharacter(), {
      wrapper: CharacterProvider,
    });

    act(() => {
      result.current.getFavoriteCharacters();
    });

    expect(result.current.characters).toEqual({
      count: 20,
      results: [],
    });
  });

  it('should able to search character in orderByName', async () => {
    const getCharactersServiceSpy = jest
      .spyOn(getCharactersService, 'execute')
      .mockImplementationOnce((): any => {
        return {
          offset: 0,
          limit: 20,
          total: 1493,
          count: 20,
          results: [],
        };
      });
    const { result, waitForNextUpdate } = renderHook(() => useCharacter(), {
      wrapper: CharacterProvider,
    });

    act(() => {
      result.current.getCharactersOrderByName('john');
    });
    await waitForNextUpdate();

    expect(getCharactersServiceSpy).toHaveBeenCalledWith('john');
  });

  it('should able to search character in favorites', () => {
    const getFavoritesCharactersServiceSpy = jest
      .spyOn(getFavoritesCharactersService, 'execute')
      .mockImplementationOnce((): any => {
        return {
          count: 20,
          results: [],
        };
      });
    const { result } = renderHook(() => useCharacter(), {
      wrapper: CharacterProvider,
    });
    act(() => {
      result.current.setSearchValue('john');
    });

    act(() => {
      result.current.getFavoriteCharacters();
    });

    expect(getFavoritesCharactersServiceSpy).toHaveBeenCalledWith('john');
  });

  it('should able to save character in favorites when option is orderByName', async () => {
    jest
      .spyOn(getCharactersService, 'execute')
      .mockImplementationOnce((): any => {
        return {
          offset: 0,
          limit: 20,
          total: 1493,
          count: 20,
          results: [character],
        };
      });
    const { result, waitForNextUpdate } = renderHook(() => useCharacter(), {
      wrapper: CharacterProvider,
    });
    act(() => {
      result.current.getCharactersOrderByName();
    });
    await waitForNextUpdate();

    act(() => {
      result.current.saveFavorite(character);
    });

    expect(result.current.characters?.results[0]).toEqual({
      ...character,
      isFavorite: true,
    });
  });

  it('should able to save character in favorites when option is favorite', async () => {
    jest
      .spyOn(getCharactersService, 'execute')
      .mockImplementationOnce((): any => {
        return {
          offset: 0,
          limit: 20,
          total: 1493,
          count: 20,
          results: [character],
        };
      });
    const { result } = renderHook(() => useCharacter(), {
      wrapper: CharacterProvider,
    });
    act(() => {
      result.current.setOption('favorites');
      result.current.getFavoriteCharacters();
    });

    act(() => {
      result.current.saveFavorite(character);
    });

    expect(result.current.characters?.results[0]).toEqual({
      ...character,
      isFavorite: true,
    });
  });

  it('should able to save character in favorites and not update characters state', async () => {
    jest
      .spyOn(getCharactersService, 'execute')
      .mockImplementationOnce((): any => {
        return {
          offset: 0,
          limit: 20,
          total: 1493,
          count: 20,
          results: [character],
        };
      });
    const { result, waitForNextUpdate } = renderHook(() => useCharacter(), {
      wrapper: CharacterProvider,
    });
    act(() => {
      result.current.getCharactersOrderByName();
    });
    await waitForNextUpdate();

    act(() => {
      result.current.saveFavorite({ ...character, id: 2 });
    });

    expect(result.current.characters?.results[0]).toEqual(character);
  });

  it('should able to show alert', async () => {
    jest
      .spyOn(saveFavoriteCharacterService, 'execute')
      .mockImplementationOnce((): any => {
        throw new Error();
      });
    const spyToast = jest.spyOn(toast, 'error');
    const { result, waitForNextUpdate } = renderHook(() => useCharacter(), {
      wrapper: CharacterProvider,
    });
    act(() => {
      result.current.getCharactersOrderByName();
    });
    await waitForNextUpdate();

    result.current.saveFavorite({ ...character, id: 2 });

    expect(spyToast).toHaveBeenCalled();
  });

  it('should able to remove character of favorites wahen option is favorite', () => {
    jest
      .spyOn(getFavoritesCharactersService, 'execute')
      .mockImplementationOnce((): any => {
        return {
          count: 1,
          results: [character],
        };
      });
    const spyGetFavoritesCharactersService = jest
      .spyOn(getFavoritesCharactersService, 'execute')
      .mockImplementationOnce((): any => {
        return {
          count: 20,
          results: [],
        };
      });
    const { result } = renderHook(() => useCharacter(), {
      wrapper: CharacterProvider,
    });
    act(() => {
      result.current.setOption('favorites');
      result.current.getFavoriteCharacters();
    });

    act(() => {
      result.current.removeFavorite(character.id);
    });

    expect(spyGetFavoritesCharactersService).toHaveBeenCalled();
  });

  it('should able to remove character of favorites wahen option is orderByName', async () => {
    jest
      .spyOn(getCharactersService, 'execute')
      .mockImplementationOnce((): any => {
        return {
          offset: 0,
          limit: 20,
          total: 1493,
          count: 20,
          results: [character],
        };
      });
    const { result, waitForNextUpdate } = renderHook(() => useCharacter(), {
      wrapper: CharacterProvider,
    });
    act(() => {
      result.current.getCharactersOrderByName();
    });
    await waitForNextUpdate();

    act(() => {
      result.current.setOption('orderByName');
      result.current.removeFavorite(character.id);
    });

    expect(result.current.characters?.results[0]).toEqual({
      ...character,
      isFavorite: false,
    });
  });
});
