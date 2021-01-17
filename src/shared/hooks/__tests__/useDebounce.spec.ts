import { renderHook } from '@testing-library/react-hooks';

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
    const { result } = renderHook(() => useDebounce({ value, delay: 1000 }));

    jest.advanceTimersByTime(1000);
    runInterval();

    expect(result.current).toBe(value);
  });
});
