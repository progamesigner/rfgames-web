import { compressToUTF16, decompressFromUTF16 } from 'lz-string'
import { debounce } from 'throttle-debounce'

import { config } from '../config'
import { GW2Resources } from '../types'

const CACHE_VERSION_KEY = 'CACHE_VERSION'
const FORCE_CLEAR_CACHE_KEY = 'FORCE_CLEAR_CACHE'
const GW2_BUILD_KEY = 'GW2_BUILD'

const EMPTY_CACHE = JSON.stringify({})

const makeKey = (key: string) => `GW2:EMBED:${key.toUpperCase()}`

const markForceClared = debounce(config.cacheClearBatchWait, clear.bind(null, FORCE_CLEAR_CACHE_KEY))

export function checkBuildIdUpdated(id: number): boolean {
  const currentBuildId = `${id}`
  const savedBuildId = get(GW2_BUILD_KEY)
  set(GW2_BUILD_KEY, currentBuildId)
  return !!savedBuildId && currentBuildId !== savedBuildId
}

export function clear(key: string): void {
  const {
    localStorage
  } = window

  if (localStorage) {
    localStorage.removeItem(makeKey(key))
  }
}

export function clearCacheIfRequested(key: string): void {
  if (get(FORCE_CLEAR_CACHE_KEY) === 'true') {
    clear(key)
    markForceClared()
  }
}

export function forceClearCacheOnNextLoad(key: string): void {
  const cacheVersion = get(CACHE_VERSION_KEY)
  if (cacheVersion !== key) {
    set(CACHE_VERSION_KEY, key)
    if (cacheVersion !== null) {
      set(FORCE_CLEAR_CACHE_KEY, 'true')
    }
  }
}

export function get(key: string): string | null {
  const {
    localStorage
  } = window

  if (localStorage) {
    const compressed = localStorage.getItem(makeKey(key))

    if (compressed) {
      return decompressFromUTF16(compressed)
    }
  }

  return null
}

export function parse<T>(key: string): T {
  return JSON.parse(get(key) ?? EMPTY_CACHE) as T
}

export function set(key: string, value: string): void {
  const {
    localStorage
  } = window

  if (localStorage) {
    const compressed = compressToUTF16(value)

    try {
      localStorage.setItem(makeKey(key), compressed)
    } catch (error) {
      console.error('Local storage is full!')
    }
  }
}

export function makeResourceKey(resource: GW2Resources, language: string): string {
  return `${resource.replace('GW2_', '').replace('_', '')}S_${language}_DATA`
}
