type GW2BaseFact<T extends string> = {
  type: T;
  text: string;
  icon: string;
}

type GW2BuffPrefix = {
  text: string;
  icon: string;
  status: string;
  description: string;
}

type GW2TraitedFactFields = {
  requires_trait: number;
  overrides: number;
}

type GW2FactAttributeAdjustFields = {
  value: number;
  target: string;
}

type GW2FactBuffFields = {
  duration: number;
  status: string;
  description: string;
  apply_count: number;
}

type GW2FactBuffConversionFields = {
  source: string;
  percent: string;
  target: string;
}

type GW2FactComboFieldFields = {
  field_type: string;
}

type GW2FactComboFinisherFields = {
  percent: number;
  finisher_type: string;
}

type GW2FactDamageFields = {
  hit_count: number;
}

type GW2FactDistanceFields = {
  distance: number;
}

type GW2FactNumberFields = {
  value: number;
}

type GW2FactPercentFields = {
  percent: number;
}

type GW2FactPrefixedBuffFields = {
  percent: number;
  duration: number;
  status: string;
  description: string;
  apply_count: number;
  prefix: GW2BuffPrefix;
}

type GW2FactRadiusFields = {
  distance: number;
}

type GW2FactRangeFields = {
  value: number;
}

type GW2FactRechargeFields = {
  value: number;
}

type GW2FactTimeFields = {
  duration: number;
}

type GW2FactUnblockableFields = {
  value: boolean;
}

export type GW2Fact =
  GW2BaseFact<'AttributeAdjust'> & GW2FactAttributeAdjustFields |
  GW2BaseFact<'Buff'> & GW2FactBuffFields |
  GW2BaseFact<'BuffConversion'> & GW2FactBuffConversionFields |
  GW2BaseFact<'ComboField'> & GW2FactComboFieldFields |
  GW2BaseFact<'ComboFinisher'> & GW2FactComboFinisherFields |
  GW2BaseFact<'Damage'> & GW2FactDamageFields |
  GW2BaseFact<'Distance'> & GW2FactDistanceFields |
  GW2BaseFact<'NoData'> |
  GW2BaseFact<'Number'> & GW2FactNumberFields |
  GW2BaseFact<'Percent'> & GW2FactPercentFields |
  GW2BaseFact<'PrefixedBuff'> & GW2FactPrefixedBuffFields |
  GW2BaseFact<'Radius'> & GW2FactRadiusFields |
  GW2BaseFact<'Range'> & GW2FactRangeFields |
  GW2BaseFact<'Recharge'> & GW2FactRechargeFields |
  GW2BaseFact<'Time'> & GW2FactTimeFields |
  GW2BaseFact<'Unblockable'> & GW2FactUnblockableFields

export type GW2TraitedFact = GW2Fact & GW2TraitedFactFields
