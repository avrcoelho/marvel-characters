import { renderHook, act } from '@testing-library/react-hooks';

import { useCharacter, CharacterProvider } from '../context/character';
import {
  getCharactersService,
  getFavoritesCharactersService,
  removeFavoriteCharacterService,
} from '../../services/index';

describe('character Hook', () => {
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

  it('should able dont return data', () => {
    jest
      .spyOn(getCharactersService, 'execute')
      .mockImplementationOnce((): any => {
        return null;
      });
    const { result } = renderHook(() => useCharacter(), {
      wrapper: CharacterProvider,
    });

    act(() => {
      result.current.getCharactersOrderByName();
    });

    expect(result.current.characters).toEqual(null);
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

  it('should able to save character in favorites', async () => {
    const character = {
      id: 1,
      name: 'John Doe',
      thumbnail: {
        path: 'path',
        extension: 'jpg',
      },
    };
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
      id: 1,
      name: 'John Doe',
      thumbnail: {
        path: 'path',
        extension: 'jpg',
      },
      isFavorite: true,
    });
  });

  it('should able to save character in favorites and not update characters state', async () => {
    const character = {
      id: 1,
      name: 'John Doe',
      thumbnail: {
        path: 'path',
        extension: 'jpg',
      },
    };
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

  it('should able to remove character of favorites wahen option is favorite', () => {
    const character = {
      id: 1,
      name: 'John Doe',
      thumbnail: {
        path: 'path',
        extension: 'jpg',
      },
    };
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
    const character = {
      id: 1,
      name: 'John Doe',
      thumbnail: {
        path: 'path',
        extension: 'jpg',
      },
    };
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
      id: 1,
      name: 'John Doe',
      thumbnail: {
        path: 'path',
        extension: 'jpg',
      },
      isFavorite: false,
    });
  });
});
