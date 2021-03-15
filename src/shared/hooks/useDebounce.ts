import { useCallback, useRef } from 'react';

export const useDebounce = (delay: number): ((func: () => void) => void) => {
  const timer = useRef<ReturnType<typeof setTimeout>>(0);

  const handleDebounce = useCallback(
    (func): void => {
      clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        func();
      }, delay);
    },
    [delay],
  );

  return handleDebounce;
};
