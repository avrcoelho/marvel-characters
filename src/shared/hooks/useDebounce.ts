import { useCallback, useRef } from 'react';

let timer: NodeJS.Timeout;

export const useDebounce = (delay: number): ((func: () => void) => void) => {
  const handleDebounce = useCallback(
    (func): void => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        func();
      }, delay);
    },
    [delay],
  );

  return handleDebounce;
};
