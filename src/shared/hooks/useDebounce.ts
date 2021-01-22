import { useCallback, useRef } from 'react';

type Hook = (
  delay: number,
) => {
  handleDebounce(func: () => void): void;
};

export const useDebounce: Hook = (delay: number) => {
  const timer = useRef<any>(null);

  const handleDebounce = useCallback(
    (func): void => {
      clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        func();
      }, delay);
    },
    [delay],
  );

  return { handleDebounce };
};
