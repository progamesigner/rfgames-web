import { GW2BaseRecord } from './base'

export interface GW2Specialization extends GW2BaseRecord<number> {
  name: string;
  profession: string;
  elite: boolean;
  icon: string;
  background: string;
  minor_traits: Array<number>;
  major_traits: Array<number>;
}
