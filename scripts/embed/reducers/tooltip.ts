import { Reducer } from 'redux'

import { TOGGLE_TOOLTIP, ToggleTooltipAction } from '../actions'
import { EmbedState } from '../types'

function tooltipReducer(
  state: EmbedState = {},
  action: ToggleTooltipAction
): EmbedState {
  const {
    payload: tooltip
  } = action

  return {
    ...state,
    tooltip
  }
}

export const tooltipReducers = {
  [TOGGLE_TOOLTIP]: tooltipReducer as Reducer<EmbedState>
}
