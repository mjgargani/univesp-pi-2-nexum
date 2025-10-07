import { useEffect, useState } from 'react';

export function useLocalStorage() {
  const [localStorage, setLocalStorage] = useState<{key: string, value: string}[]>([]);

  useEffect(() => {
    const storedData = Object.keys(window.localStorage).map(key => ({
      key,
      value: window.localStorage.getItem(key) || ''
    }));
    setLocalStorage(storedData);
  }, []);

  return [localStorage, setLocalStorage] as const;
}
