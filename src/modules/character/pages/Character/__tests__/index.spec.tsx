import { act, render, waitFor } from '@testing-library/react';
import { toast, ToastContainer } from 'react-toastify';

import {
  getCharacterService,
  getCharacterComicsService,
} from '../../../services';
import Character from '..';

const promise = Promise.resolve();

jest.mock('react-router-dom', () => {
  return {
    useParams: () => ({
      id: '123',
    }),
  };
});

describe('Character page', () => {
  it('should be able to get character', async () => {
    const spyGetCharacterService = jest
      .spyOn(getCharacterService, 'execute')
      .mockImplementation((): any => {
        return {
          offset: 0,
          limit: 20,
          total: 1493,
          count: 20,
          results: [],
        };
      });
    jest
      .spyOn(getCharacterComicsService, 'execute')
      .mockImplementation((): any => {
        return {
          offset: 0,
          limit: 20,
          total: 1493,
          count: 20,
          results: [],
        };
      });
    render(<Character />);

    expect(spyGetCharacterService).toHaveBeenCalledWith('123');
    await act(() => promise);
  });

  it('should be able to get comic', async () => {
    const spyGetCharacterComicsService = jest
      .spyOn(getCharacterComicsService, 'execute')
      .mockImplementation((): any => {
        return {
          offset: 0,
          limit: 20,
          total: 1493,
          count: 20,
          results: [],
        };
      });
    jest.spyOn(getCharacterService, 'execute').mockImplementation((): any => {
      return {
        offset: 0,
        limit: 20,
        total: 1493,
        count: 20,
        results: [],
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
    const spyToast = jest.spyOn(toast, 'error');
    render(<Character />);

    await waitFor(() => {
      expect(spyToast).toHaveBeenCalled();
    });
  });
});
