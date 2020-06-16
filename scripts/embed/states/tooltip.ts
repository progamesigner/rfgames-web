import { TooltipState } from '../types'

type TooltipInitialState = Partial<Record<string, TooltipState>>

export function tooltipInitialState(): TooltipInitialState {
  return {
    tooltip: undefined
  }
}
