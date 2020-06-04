interface GW2FactBase<T extends GW2FactType> {
  type: T;
  text: string;
  icon: string;
}

interface GW2TraitedFactFields {
  requires_trait: number;
  overrides: number;
}

export const enum GW2FactType {
  ATTRIBUTE_ADJUST = 'AttributeAdjust',
  BUFF = 'Buff',
  BUFF_CONVERSION = 'BuffConversion',
  COMBO_FIELD = 'ComboField',
  COMBO_FINISHER = 'ComboFinisher',
  DAMAGE = 'Damage',
  DISTANCE = 'Distance',
  DURATION = 'Duration',
  HEAL = 'Heal',
  HEALING_ADJUST = 'HealingAdjust',
  NO_DATA = 'NoData',
  NUMBER = 'Number',
  PERCENT = 'Percent',
  PREFIXED_BUFF = 'PrefixedBuff',
  RADIUS = 'Radius',
  RANGE = 'Range',
  RECHARGE = 'Recharge',
  TIME = 'Time',
  UNBLOCKABLE = 'Unblockable'
}

export interface GW2FactAttributeAdjust extends GW2FactBase<GW2FactType.ATTRIBUTE_ADJUST> {
  value: number;
  target: string;
}

export interface GW2FactBuff extends GW2FactBase<GW2FactType.BUFF> {
  duration?: number;
  status: string;
  description?: string;
  apply_count?: number;
}

export interface GW2FactBuffConversion extends GW2FactBase<GW2FactType.BUFF_CONVERSION> {
  source: string;
  percent: number;
  target: string;
}

export interface GW2FactComboField extends GW2FactBase<GW2FactType.COMBO_FIELD> {
  field_type: string;
}

export interface GW2FactComboFinisher extends GW2FactBase<GW2FactType.COMBO_FINISHER> {
  percent: number;
  finisher_type: string;
}

export interface GW2FactDamage extends GW2FactBase<GW2FactType.DAMAGE> {
  hit_count: number;
  dmg_multiplier?: number;
}

export interface GW2FactDistance extends GW2FactBase<GW2FactType.DISTANCE> {
  distance: number;
}

export interface GW2FactDuration extends GW2FactBase<GW2FactType.DURATION> {
  duration: number;
}

export interface GW2FactHeal extends GW2FactBase<GW2FactType.HEAL> {
  hit_count: number;
}

export interface GW2FactHealingAdjust extends GW2FactBase<GW2FactType.HEALING_ADJUST> {
  hit_count: number;
}

export interface GW2FactNumber extends GW2FactBase<GW2FactType.NUMBER> {
  value: number;
}

export interface GW2FactPercent extends GW2FactBase<GW2FactType.PERCENT> {
  percent: number;
}

export interface GW2FactPrefixedBuff extends GW2FactBase<GW2FactType.PREFIXED_BUFF> {
  duration?: number;
  status: string;
  description?: string;
  apply_count?: number;
  prefix: GW2FactPrefixedBuffPrefix;
}

export interface GW2FactPrefixedBuffPrefix {
  text: string;
  icon: string;
  status: string;
  description: string;
}

export interface GW2FactRadius extends GW2FactBase<GW2FactType.RADIUS> {
  distance: number;
}

export interface GW2FactRange extends GW2FactBase<GW2FactType.RANGE> {
  value: number;
}

export interface GW2FactRecharge extends GW2FactBase<GW2FactType.RECHARGE> {
  value: number;
}

export interface GW2FactTime extends GW2FactBase<GW2FactType.TIME> {
  duration: number;
}

export interface GW2FactUnblockable extends GW2FactBase<GW2FactType.UNBLOCKABLE> {
  value: true;
}

export type GW2FactNoData = GW2FactBase<GW2FactType.NO_DATA>

export type GW2Fact =
  GW2FactAttributeAdjust |
  GW2FactBuff |
  GW2FactBuffConversion |
  GW2FactComboField |
  GW2FactComboFinisher |
  GW2FactDamage |
  GW2FactDistance |
  GW2FactDuration |
  GW2FactHeal |
  GW2FactHealingAdjust |
  GW2FactNoData |
  GW2FactNumber |
  GW2FactPercent |
  GW2FactPrefixedBuff |
  GW2FactRadius |
  GW2FactRange |
  GW2FactRecharge |
  GW2FactTime |
  GW2FactUnblockable

export type GW2TraitedFact = GW2Fact & GW2TraitedFactFields
