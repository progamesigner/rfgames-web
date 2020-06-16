import { tap } from 'lodash/fp'
import { redraw } from 'mithril'
import {
  Action,
  applyMiddleware,
  createStore,
  Middleware,
  Store
} from 'redux'

import { config } from './config'
import { initializeReducer } from './reducers'
import { initializeState } from './states'
import { EmbedOptions, EmbedState } from './types'

const mithril: Middleware = () => dispatch => action => {
  return tap<EmbedState>(() => redraw())(dispatch(action))
}

function parseOptions(window: Window): EmbedOptions {
  return {
    cacheVersion: '__INITIAL__',
    language: config.gw2ApiDefaultLanguage,
    useLocalStorageAsCache: true,
    ...window.GW2_EMBED_OPTIONS
  }
}

export function getStore(window: Window): Store<EmbedState, Action> {
  const options = parseOptions(window)
  return createStore(
    initializeReducer(options),
    initializeState(options),
    applyMiddleware(mithril)
  )
}
