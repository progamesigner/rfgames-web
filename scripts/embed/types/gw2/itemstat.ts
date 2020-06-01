import { GW2BaseRecord } from './base'
import { GW2ItemAttribute } from './item'

type GW2ItemStatAttributeType = GW2ItemAttribute | 'AgonyResistance'

interface GW2ItemStatAttribute {
  attribute: GW2ItemStatAttributeType;
  multiplier: number;
  value: number;
}

export interface GW2ItemStat extends GW2BaseRecord<number> {
  name: string;
  attributes: Array<GW2ItemStatAttribute>;
}
