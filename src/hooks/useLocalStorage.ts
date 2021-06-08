import { Ref, ref, UnwrapRef, watchEffect } from '@vue/runtime-core'

const tryParseJson = <T>(s: string | null): T | undefined => {
  if (!s) return undefined
  try {
    return JSON.parse(s)
  } catch {
    return undefined
  }
}

export default function useLocalStorage<T>(key: string, defaultValue: T): Ref<UnwrapRef<T>> {
  const value = ref(tryParseJson<T>(localStorage.getItem(key)) ?? defaultValue)
  watchEffect(() => {
    localStorage.setItem(key, JSON.stringify(value.value))
  })
  return value
}