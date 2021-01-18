import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';

import { useDebounce } from '../useDebounce';

const runInterval = async (): Promise<any> => {
  await new Promise(r => setTimeout(r, 1000));
};

describe('debounce Hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should able to return value', async () => {
    const value = 'test';
    act(() => {
      const { result } = renderHook(() => useDebounce({ value, delay: 500 }));

      jest.advanceTimersByTime(500);
      runInterval();

      expect(result.current).toBe(value);
    });
  });
});
