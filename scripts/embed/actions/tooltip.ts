import {
  BaseAction,
  ExtractTooltipData,
  ExtractTooltipType,
  ToggleTooltipPayload,
  TooltipDataTypes,
  TooltipType
} from '../types'

export const TOGGLE_TOOLTIP = 'TOGGLE_TOOLTIP'

export type ToggleTooltipAction<T extends TooltipType, D extends TooltipDataTypes> = BaseAction<ToggleTooltipPayload<T, D>>

export function showTooltip<T extends TooltipType, D extends TooltipDataTypes>(
  type: ExtractTooltipType<T, D>,
  data: ExtractTooltipData<T, D>
): ToggleTooltipAction<T, D> {
  return {
    type: TOGGLE_TOOLTIP,
    payload: {
      data,
      show: true,
      type
    }
  }
}

export function hideTooltip(): ToggleTooltipAction<TooltipType.EMPTY, null> {
  return {
    type: TOGGLE_TOOLTIP,
    payload: {
      data: null,
      show: false,
      type: TooltipType.EMPTY
    }
  }
}
