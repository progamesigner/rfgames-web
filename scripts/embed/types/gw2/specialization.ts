import { GW2BaseRecord } from './base'

export type GW2Specialization = GW2BaseRecord<number> & {
  name: string;
  profession: string;
  elite: boolean;
  icon: string;
  background: string;
  minor_traits: Array<number>;
  major_traits: Array<number>;
}
