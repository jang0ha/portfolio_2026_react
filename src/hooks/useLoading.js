import { useState, useCallback } from 'react'

export function useLoading(key) {
  const [loadedKey, setLoadedKey] = useState(null)
  const isLoading = loadedKey !== key
  const setLoaded = useCallback(() => setLoadedKey(key), [key])

  return { isLoading, setLoaded }
}
