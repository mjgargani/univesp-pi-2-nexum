import { useEffect, useState } from 'react';
import { getKeyValue, setKeyValue } from '../helpers/keyValue';

type Dict = Record<string, string>;

const readSnapshot = (): Dict => {
  if (typeof window === 'undefined') return {};
  const ls = window.localStorage;
  const out: Dict = {};
  for (let i=0; i< ls.length; i++) {
    const k = ls.key(i)!;
    out[k] = ls.getItem(k) ?? '';
  }
  return out;
}

export function useLocalStorage() {
  const isBrowser = typeof window !== 'undefined';
  const [state, setState] = useState<Dict>(() => readSnapshot());

  useEffect(() => {
    if (!isBrowser) return;
    const onStorage = (e: StorageEvent) => {
      if (e.storageArea === window.localStorage) setState(readSnapshot());
    }
    return () => window.removeEventListener('storage', onStorage);
  }, [isBrowser]);

  const setItem = (key:string, value: string) => {
    if (!isBrowser) return;
    const newValue = setKeyValue(key, value);
    window.localStorage.setItem(key, newValue[key]);
    setState(readSnapshot());
  }

  const getItem = (key: string, defaultValue: string | null = null) => {
    if (key in state) return getKeyValue(key, state, defaultValue);
    return defaultValue;
  }

  const clear = () => {
    if (!isBrowser) return;
    window.localStorage.clear();
    setState(readSnapshot());
  }

  return {setItem, getItem, clear} as const
}