import { debounce } from 'lodash/fp'
import { compressToUTF16, decompressFromUTF16 } from 'lz-string'

import { config } from '../config'
import { GW2Resources } from '../types'

const CACHE_VERSION_KEY = 'CACHE_VERSION'
const FORCE_CLEAR_CACHE_KEY = 'FORCE_CLEAR_CACHE'
const GW2_BUILD_KEY = 'GW2_BUILD'

const makeKey = (key: string) => `GW2:EMBED:${key.toUpperCase()}`

const markForceClared = debounce(config.cacheClearBatchWait)(clear.bind(null, FORCE_CLEAR_CACHE_KEY))

export function clear(key: string): void {
  localStorage.removeItem(makeKey(key))
}

export function clearCacheIfNewBuild(key: string): void {
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
  const compressed = localStorage.getItem(makeKey(key))
  if (compressed) {
    return decompressFromUTF16(compressed)
  }
  return null
}

export function set(key: string, value: string): void {
  const compressed = compressToUTF16(value)
  try {
    localStorage.setItem(makeKey(key), compressed)
  } catch (error) {
    console.error('Local storage is full!')
  }
}

export function initializeLocalStorage(id: number): void {
  const currentBuildId = `${id}`
  const savedBuildId = get(GW2_BUILD_KEY)

  if (!savedBuildId) {
    set(GW2_BUILD_KEY, currentBuildId)
  } else if(currentBuildId !== savedBuildId) {
    set(GW2_BUILD_KEY, currentBuildId)
    set(FORCE_CLEAR_CACHE_KEY, 'true')
  }
}

export function makeResourceKey(resource: GW2Resources, language: string): string {
  return `${resource.replace('GW2_', '').replace('_', '')}S_${language}_DATA`
}
