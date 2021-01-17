import { useState, useEffect } from 'react';

interface Props {
  value: string | null;
  delay: number;
}

export const useDebounce = ({ value, delay }: Props): string | null => {
  const [debouncedValue, setDebouncedValue] = useState<string | null>(value);

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
