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

interface GW2FactBase<T extends GW2FactType> {
  type: T;
  text: string;
  icon: string;
}

interface GW2FactFieldsAttributeAdjust {
  value: number;
  target: string;
}

interface GW2FactFieldsBuff {
  duration?: number;
  status: string;
  description?: string;
  apply_count?: number;
}

interface GW2FactFieldsBuffConversion {
  source: string;
  percent: number;
  target: string;
}

interface GW2FactFieldsComboField {
  field_type: string;
}

interface GW2FactFieldsComboFinisher {
  percent: number;
  finisher_type: string;
}

interface GW2FactFieldsDamage {
  hit_count: number;
  dmg_multiplier?: number;
}

interface GW2FactFieldsDistance {
  distance: number;
}

interface GW2FactFieldsDuration {
  duration: number;
}

interface GW2FactFieldsHeal {
  hit_count: number;
}

interface GW2FactFieldsHealingAdjust {
  hit_count: number;
}

interface GW2FactFieldsNumber {
  value: number;
}

interface GW2FactFieldsPercent {
  percent: number;
}

interface GW2FactFieldsPrefixedBuff extends GW2FactFieldsBuff {
  prefix: GW2FactPrefixedBuffPrefix;
}

interface GW2FactPrefixedBuffPrefix {
  text: string;
  icon: string;
  status: string;
  description: string;
}

interface GW2FactFieldsRadius {
  distance: number;
}

interface GW2FactFieldsRange {
  value: number;
}

interface GW2FactFieldsRecharge {
  value: number;
}

interface GW2FactFieldsTime {
  duration: number;
}

interface GW2FactFieldsUnblockable {
  value: true;
}

interface GW2TraitedFactFields {
  requires_trait: number;
  overrides: number;
}

export type GW2Fact =
  GW2FactBase<GW2FactType.ATTRIBUTE_ADJUST> & GW2FactFieldsAttributeAdjust |
  GW2FactBase<GW2FactType.BUFF> & GW2FactFieldsBuff |
  GW2FactBase<GW2FactType.BUFF_CONVERSION> & GW2FactFieldsBuffConversion |
  GW2FactBase<GW2FactType.COMBO_FIELD> & GW2FactFieldsComboField |
  GW2FactBase<GW2FactType.COMBO_FINISHER> & GW2FactFieldsComboFinisher |
  GW2FactBase<GW2FactType.DAMAGE> & GW2FactFieldsDamage |
  GW2FactBase<GW2FactType.DISTANCE> & GW2FactFieldsDistance |
  GW2FactBase<GW2FactType.DURATION> & GW2FactFieldsDuration |
  GW2FactBase<GW2FactType.HEAL> & GW2FactFieldsHeal |
  GW2FactBase<GW2FactType.HEALING_ADJUST> & GW2FactFieldsHealingAdjust |
  GW2FactBase<GW2FactType.NO_DATA> |
  GW2FactBase<GW2FactType.NUMBER> & GW2FactFieldsNumber |
  GW2FactBase<GW2FactType.PERCENT> & GW2FactFieldsPercent |
  GW2FactBase<GW2FactType.PREFIXED_BUFF> & GW2FactFieldsPrefixedBuff |
  GW2FactBase<GW2FactType.RADIUS> & GW2FactFieldsRadius |
  GW2FactBase<GW2FactType.RANGE> & GW2FactFieldsRange |
  GW2FactBase<GW2FactType.RECHARGE> & GW2FactFieldsRecharge |
  GW2FactBase<GW2FactType.TIME> & GW2FactFieldsTime |
  GW2FactBase<GW2FactType.UNBLOCKABLE> & GW2FactFieldsUnblockable

export type GW2TraitedFact = GW2Fact & GW2TraitedFactFields
