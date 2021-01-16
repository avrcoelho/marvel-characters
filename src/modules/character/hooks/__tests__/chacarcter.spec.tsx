import { renderHook } from '@testing-library/react-hooks';

import { useCharacter, CharacterProvider } from '../context/character';
import { getCharactersService } from '../../services/index';

describe('character Hook', () => {
  it('should able able to call functiom get characters', async () => {
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

    result.current.getCharacters();

    await waitForNextUpdate();

    expect(result.current.characters).toEqual({
      offset: 0,
      limit: 20,
      total: 1493,
      count: 20,
      results: [],
    });
  });

  it('should able able dont return data', async () => {
    jest
      .spyOn(getCharactersService, 'execute')
      .mockImplementationOnce((): any => {
        return null;
      });
    const { result } = renderHook(() => useCharacter(), {
      wrapper: CharacterProvider,
    });

    result.current.getCharacters();

    expect(result.current.characters).toEqual(null);
  });
});
