import {
  GW2Item,
  GW2ItemStat,
  GW2Pet,
  GW2Profession,
  GW2Skill,
  GW2Specialization,
  GW2Trait
} from './gw2'

export enum TooltipType {
  EMPTY = 'Empty',
  ITEM = 'Item',
  ITEM_STAT = 'ItemStat',
  PET = 'Pet',
  PROFESSION = 'Profession',
  SKILL = 'Skill',
  SPECIALIZATION = 'Specialization',
  TEXT = 'Text',
  TRAIT = 'Trait'
}

type TooltipPayload<
  T extends TooltipType,
  D extends TooltipDataTypes
> = {
  data: D;
  type: T;
}

type TooltipData =
  TooltipPayload<TooltipType.EMPTY, null> |
  TooltipPayload<TooltipType.ITEM_STAT, GW2ItemStat> |
  TooltipPayload<TooltipType.ITEM, GW2Item> |
  TooltipPayload<TooltipType.PET, GW2Pet> |
  TooltipPayload<TooltipType.PROFESSION, GW2Profession> |
  TooltipPayload<TooltipType.SKILL, GW2Skill> |
  TooltipPayload<TooltipType.SPECIALIZATION, GW2Specialization> |
  TooltipPayload<TooltipType.TEXT, string> |
  TooltipPayload<TooltipType.TRAIT, GW2Trait>

export type TooltipDataTypes =
  GW2Item |
  GW2ItemStat |
  GW2Pet |
  GW2Profession |
  GW2Skill |
  GW2Specialization |
  GW2Trait |
  null |
  string

export type ExtractTooltipType<T extends TooltipType, D extends TooltipDataTypes> = TooltipPayload<T, D> extends TooltipData ? T : never
export type ExtractTooltipData<T extends TooltipType, D extends TooltipDataTypes> = TooltipPayload<T, D> extends TooltipData ? D : never

export type ToggleTooltipPayload<
  T extends TooltipType,
  D extends TooltipDataTypes
> = TooltipPayload<T, D> & {
  show: boolean;
}

export type TooltipState =
  ToggleTooltipPayload<TooltipType.EMPTY, null> |
  ToggleTooltipPayload<TooltipType.ITEM_STAT, GW2ItemStat> |
  ToggleTooltipPayload<TooltipType.ITEM, GW2Item> |
  ToggleTooltipPayload<TooltipType.PET, GW2Pet> |
  ToggleTooltipPayload<TooltipType.PROFESSION, GW2Profession> |
  ToggleTooltipPayload<TooltipType.SKILL, GW2Skill> |
  ToggleTooltipPayload<TooltipType.SPECIALIZATION, GW2Specialization> |
  ToggleTooltipPayload<TooltipType.TEXT, string> |
  ToggleTooltipPayload<TooltipType.TRAIT, GW2Trait>
