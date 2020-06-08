export const enum TooltipType {
  EMPTY = 'Empty'
}

export interface TooltipTypeMapping {
  [TooltipType.EMPTY]: [null, null];
}

export interface TooltipState {
  data: ExtractTooltipDataType<TooltipType>;
  show: boolean;
  type: TooltipType;
}

export type ExtractTooltipAttributeType<T extends TooltipType> = TooltipTypeMapping extends Pick<TooltipTypeMapping, T> ? TooltipTypeMapping[T][0] : never
export type ExtractTooltipDataType<T extends TooltipType> = TooltipTypeMapping extends Pick<TooltipTypeMapping, T> ? TooltipTypeMapping[T][1] : never
