import { Action, Reducer } from 'redux'

import { gw2Reducers } from './gw2'
import { tooltipReducers } from './tooltip'

import { EmbedState, EmbedOptions } from '../types'

export function initializeReducer(options: EmbedOptions): Reducer {
  const reducers = {
    ...gw2Reducers(options.language),
    ...tooltipReducers
  } as Record<string, Reducer<EmbedState>>

  return (state: EmbedState = {}, action: Action): EmbedState => {
    const reducer = reducers[action.type]
    return reducer ? reducer(state, action) : state
  }
}
