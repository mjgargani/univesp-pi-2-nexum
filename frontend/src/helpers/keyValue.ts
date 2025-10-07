const setKeyValue = <T,>(key: string, value: T) => ({
  [key]: JSON.stringify(value)
})

const getKeyValue = <T,>(key: string, dict: Record<string, string>, defaultValue: T): T => {
  if (!(key in dict)) return defaultValue;
  try {
    return JSON.parse(dict[key]) as T;
  } catch {
    return defaultValue;
  }
}

export { setKeyValue, getKeyValue };