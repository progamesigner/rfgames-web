import {
  BaseAction,
  ExtractTooltipDataType,
  ExtractTooltipType,
  TooltipPayload,
  TooltipState,
  TooltipType
} from '../types'

interface ToggleTooltipPayload {
  payload: TooltipState;
}

export const TOGGLE_TOOLTIP = 'TOGGLE_TOOLTIP'

export type ToggleTooltipAction = BaseAction<ToggleTooltipPayload>

export function showTooltip<T extends TooltipType, D extends TooltipPayload>(
  type: ExtractTooltipType<T, D>,
  data: ExtractTooltipDataType<T, D>
): ToggleTooltipAction {
  return {
    type: TOGGLE_TOOLTIP,
    payload: {
      data,
      show: true,
      type
    } as TooltipState
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
