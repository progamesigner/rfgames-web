export const enum TooltipType {
  EMPTY = 'Empty'
}

export interface TooltipTypeMapping {
  [TooltipType.EMPTY]: null;
}

export type ExtractTooltipDataType<T extends TooltipType> = TooltipTypeMapping extends Pick<TooltipTypeMapping, T> ? TooltipTypeMapping[T] : never

export interface TooltipState {
  data: ExtractTooltipDataType<TooltipType>;
  show: boolean;
  type: TooltipType;
}
