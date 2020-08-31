import { Reducer } from 'redux'

import {
  UPDATE_TOOLTIP_HIDABILITY,
  UPDATE_TOOLTIP,
  UpdateTooltipAction,
  UpdateTooltipHidabilityAction
} from '../actions'
import { EmbedState } from '../types'

function updateTooltip(
  state: EmbedState = {},
  action: UpdateTooltipAction
): EmbedState {
  const {
    payload: tooltip
  } = action

  return {
    ...state,
    tooltip
  }
}

function updateTooltipHidability(
  state: EmbedState = {},
  action: UpdateTooltipHidabilityAction
): EmbedState {
  const {
    hidable: tooltipHidable
  } = action

  return {
    ...state,
    tooltipHidable
  }
}

export const tooltipReducers = {
  [UPDATE_TOOLTIP]: updateTooltip as Reducer<EmbedState>,
  [UPDATE_TOOLTIP_HIDABILITY]: updateTooltipHidability as Reducer<EmbedState>
}
