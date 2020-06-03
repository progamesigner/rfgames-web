import { Reducer } from 'redux'

import { TOGGLE_TOOLTIP, ToggleTooltipAction } from '../actions'
import { EmbedState, TooltipDataTypes, TooltipState, TooltipType } from '../types'

function tooltipReducer<T extends TooltipType, D extends TooltipDataTypes>(
  state: EmbedState = {},
  action: ToggleTooltipAction<T, D>
): EmbedState {
  const {
    payload
  } = action

  return {
    ...state,
    tooltip: payload as TooltipState
  }
}

export default {
  [TOGGLE_TOOLTIP]: tooltipReducer as Reducer<EmbedState>
}
