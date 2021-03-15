import { renderHook } from '@testing-library/react-hooks';

import { useDebounce } from '../useDebounce';

const mockFunc = jest.fn();

const runInterval = async (): Promise<any> => {
  await new Promise(r => setTimeout(r, 500));
};

describe('debounce Hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should able to return value', () => {
    const { result } = renderHook(() => useDebounce(500));

    result.current(mockFunc);
    jest.advanceTimersByTime(500);
    runInterval();

    expect(mockFunc).toHaveBeenCalled();
  });
});
