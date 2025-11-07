import { useCallback, useEffect, useMemo, useState } from 'react';
import { getKeyValue, setKeyValue } from '../helpers/keyValue';

type Dict = Record<string, string>;

const readSnapshot = (): Dict => {
  if (typeof window === 'undefined') return {};
  const ls = window.localStorage;
  const out: Dict = {};

  // O loop serve para garantir que todos os itens sejam lidos
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

  const setItem = useCallback((key:string, value: string) => {
    if (!isBrowser) return;
    const newValue = setKeyValue(key, value);
    window.localStorage.setItem(key, newValue[key]);
    setState(readSnapshot());
  }, [isBrowser]);

  const getItem = useCallback((key: string, defaultValue: string | null = null) => {
    if (key in state) return getKeyValue(key, state, defaultValue);
    return defaultValue;
  }, [state]);

  const removeItem = useCallback((key: string) => {
    if (!isBrowser) return;
    window.localStorage.removeItem(key);
    setState(readSnapshot());
  }, [isBrowser]);

  const clear = useCallback(() => {
    if (!isBrowser) return;
    window.localStorage.clear();
    setState(readSnapshot());
  }, [isBrowser]);  

  return useMemo(() => ({
    setItem, getItem, removeItem, clear
  }), [setItem, getItem, removeItem, clear]);
}