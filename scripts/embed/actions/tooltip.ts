import {
  BaseAction,
  ExtractTooltipDataType,
  TooltipState,
  TooltipType
} from '../types'

interface ToggleTooltipPayload {
  payload: TooltipState;
}

export const TOGGLE_TOOLTIP = 'TOGGLE_TOOLTIP'

export type ToggleTooltipAction = BaseAction<ToggleTooltipPayload>

export function showTooltip<T extends TooltipType>(
  type: T,
  data: ExtractTooltipDataType<T>
): ToggleTooltipAction {
  return {
    type: TOGGLE_TOOLTIP,
    payload: {
      data,
      show: true,
      type
    }
  }
}

export function hideTooltip(): ToggleTooltipAction {
  return {
    type: TOGGLE_TOOLTIP,
    payload: {
      data: null,
      show: false,
      type: TooltipType.EMPTY
    }
  }
}
