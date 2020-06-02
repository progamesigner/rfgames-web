import { GW2BaseRecord } from './base'

type GW2PetSkill = GW2BaseRecord<number>

export type GW2Pet = GW2BaseRecord<number> & {
  name: string;
  description: string;
  icon: string;
  skills: Array<GW2PetSkill>;
}
