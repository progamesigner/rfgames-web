import {
  GW2Item,
  GW2ItemStat,
  GW2Pet,
  GW2Skill,
  GW2Specialization,
  GW2Trait
} from './gw2'

interface TooltipTypeBinding<T extends TooltipType, D extends TooltipPayload> {
  type: T;
  data: D;
}

type TooltipTypeBindingMap =
  TooltipTypeBinding<TooltipType.EMPTY, null> |
  TooltipTypeBinding<TooltipType.GW2_ITEM_STAT, GW2ItemStat> |
  TooltipTypeBinding<TooltipType.GW2_ITEM, GW2Item> |
  TooltipTypeBinding<TooltipType.GW2_PET, GW2Pet> |
  TooltipTypeBinding<TooltipType.GW2_SKILL, GW2Skill> |
  TooltipTypeBinding<TooltipType.GW2_SPECIALIZATION, GW2Specialization> |
  TooltipTypeBinding<TooltipType.GW2_TRAIT, GW2Trait> |
  TooltipTypeBinding<TooltipType.TEXT, string>

export const enum TooltipType {
  EMPTY = 'Empty',
  GW2_ITEM = 'Item',
  GW2_ITEM_STAT = 'ItemStat',
  GW2_PET = 'Pet',
  GW2_SKILL = 'Skill',
  GW2_SPECIALIZATION = 'Specialization',
  GW2_TRAIT = 'Trait',
  TEXT = 'Text'
}

export type TooltipPayload =
  GW2ItemStat |
  GW2Item |
  GW2Pet |
  GW2Skill |
  GW2Specialization |
  GW2Trait |
  null |
  string

export type TooltipState = TooltipTypeBindingMap & {
  show: boolean;
}

export type ExtractTooltipType<
  T extends TooltipType,
  D extends TooltipPayload
> = TooltipTypeBinding<T, D> extends TooltipTypeBindingMap ? T : never

export type ExtractTooltipDataType<
  T extends TooltipType,
  D extends TooltipPayload
> = TooltipTypeBinding<T, D> extends TooltipTypeBindingMap ? D : never
