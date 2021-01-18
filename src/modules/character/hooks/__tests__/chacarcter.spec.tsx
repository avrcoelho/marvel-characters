import { renderHook } from '@testing-library/react-hooks';

import { act } from '@testing-library/react';
import { useCharacter, CharacterProvider } from '../context/character';
import {
  getCharactersService,
  getFavoritesCharactersService,
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

    await waitForNextUpdate();

    expect(result.current.characters).toEqual({
      offset: 0,
      limit: 20,
      total: 1493,
      count: 20,
      results: [],
    });
  });

  it('should able dont return data', async () => {
    jest
      .spyOn(getCharactersService, 'execute')
      .mockImplementationOnce((): any => {
        return null;
      });
    const { result } = renderHook(() => useCharacter(), {
      wrapper: CharacterProvider,
    });

    expect(result.current.characters).toEqual(null);
  });

  it('should able to call functiom get characters', async () => {
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
      result.current.handleToggleOption();
    });

    expect(result.current.characters).toEqual({
      count: 20,
      results: [],
    });
  });

  it('should able to change option to orderByName', async () => {
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
      result.current.handleToggleOption();
      result.current.handleToggleOption();
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
      result.current.setSearchValue('john');
    });

    await waitForNextUpdate();

    expect(getCharactersServiceSpy).toHaveBeenCalledWith('john');
  });

  it('should able to search caharcter in favorites', async () => {
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
      result.current.handleToggleOption();
      result.current.setSearchValue('john');
    });

    expect(getFavoritesCharactersServiceSpy).toHaveBeenCalledWith('john');
  });
});
