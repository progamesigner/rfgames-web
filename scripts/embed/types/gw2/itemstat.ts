import { GW2BaseRecord } from './base'
import { GW2ItemAttribute } from './item'

type GW2ItemStatAttributeType = GW2ItemAttribute | 'AgonyResistance'

type GW2ItemStatAttribute = {
  attribute: GW2ItemStatAttributeType;
  multiplier: number;
  value: number;
}

export type GW2ItemStat = GW2BaseRecord<number> & {
  name: string;
  attributes: Array<GW2ItemStatAttribute>;
}
