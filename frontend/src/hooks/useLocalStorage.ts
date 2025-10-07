import { read } from 'fs';
import { useEffect, useMemo,  useState } from 'react';

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

  userEffect(() => {
    if (!isBrowser) return;
    const onStorage = (e: StorageEvent) => {
      if (e.storageArea === window.localStorage) setState(readSnapshot());
    }
    return () => window.removeEventListener('storage', onStorage);
  }, [isBrowser]);

  const setItem = (key:string, value: string) => {
    if (!isBrowser) return;
    window.localStorage.setItem(key, value);
    setState(readSnapshot());
  }

  const clear = () => {
    if (!isBrowser) return;
    window.localStorage.clear();
    setState(readSnapshot());
  }
}