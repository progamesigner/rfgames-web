import { types } from 'typestyle'

import {
  BaseAction,
  ExtractTooltipDataType,
  TooltipState,
  TooltipType
} from '../types'

interface UpdateTooltipPayload {
  payload: TooltipState;
}

interface UpdateTooltipHidabilityPayload {
  hidable: boolean;
}

interface UpdateTooltipStylePayload {
  styles: types.CSSProperties;
}

export const UPDATE_TOOLTIP = 'UPDATE_TOOLTIP'
export const UPDATE_TOOLTIP_HIDABILITY = 'UPDATE_TOOLTIP_HIDABILITY'
export const UPDATE_TOOLTIP_STYLES = 'UPDATE_TOOLTIP_STYLES'

export type UpdateTooltipAction = BaseAction<UpdateTooltipPayload>
export type UpdateTooltipHidabilityAction = BaseAction<UpdateTooltipHidabilityPayload>
export type UpdateTooltipStyleAction = BaseAction<UpdateTooltipStylePayload>

export function hideTooltip(): UpdateTooltipAction {
  return {
    type: UPDATE_TOOLTIP,
    payload: {
      data: null,
      show: false,
      type: TooltipType.EMPTY
    }
  }
}

export function showTooltip<T extends TooltipType>(
  type: T,
  data: ExtractTooltipDataType<T>
): UpdateTooltipAction {
  return {
    type: UPDATE_TOOLTIP,
    payload: {
      data,
      show: true,
      type
    }
  }
}

export function updateHidability(hidable: boolean): UpdateTooltipHidabilityAction {
  return {
    type: UPDATE_TOOLTIP_HIDABILITY,
    hidable
  }
}

export function updateStyles(styles: types.CSSProperties): UpdateTooltipStyleAction {
  return {
    type: UPDATE_TOOLTIP_STYLES,
    styles
  }
}
