import { GW2Record } from './base'
import { GW2ItemAttribute } from './item'

type GW2ItemStatAttributeType = GW2ItemAttribute | 'AgonyResistance'

interface GW2ItemStatAttribute {
  attribute: GW2ItemStatAttributeType;
  multiplier: number;
  value: number;
}

export interface GW2ItemStat extends GW2Record<number> {
  name: string;
  attributes: ReadonlyArray<GW2ItemStatAttribute>;
}
