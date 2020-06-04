import { Action, createStore, Store } from 'redux'

import { reducer } from './reducers'
import { initializeState } from './states'
import { EmbedOptions, EmbedState } from './types'

function parseOptions(window: Window): EmbedOptions {
  return {
    cacheVersion: '__INITIAL__',
    language: 'en',
    useLocalStorageAsCache: true,
    ...window.GW2_EMBED_OPTIONS
  }
}

export function getStore(window: Window): Store<EmbedState, Action> {
  return createStore(reducer, initializeState(parseOptions(window)))
}
