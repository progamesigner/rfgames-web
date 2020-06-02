import { Action, createStore, Store } from 'redux'

import { default as rootReducer } from './reducers'
import { default as initializeState } from './states'
import { EmbedOptions, EmbedState } from './types'

function parseOptions(window: Window): EmbedOptions {
  return {
    cacheVersion: '__INITIAL__',
    language: 'en',
    useLocalStorageAsCache: true,
    ...window.GW2_EMBED_OPTIONS
  }
}

export default function(window: Window): Store<EmbedState, Action> {
  return createStore(rootReducer, initializeState(parseOptions(window)))
}
