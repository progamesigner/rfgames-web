import { createStore, Store } from 'redux'

import { default as reducer } from './reducers'
import { default as initialState } from './states'
import { EmbedOptions } from './types'

export default function(options: EmbedOptions): Store {
  return createStore(reducer, initialState(options))
}
