import { useState, useEffect } from 'react';

interface Props {
  value: string;
  delay: number;
}

export const useDebounce = ({ value, delay }: Props): string => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return debouncedValue;
};
