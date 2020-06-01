import { GW2BaseRecord } from './base'

type GW2PetSkill = GW2BaseRecord<number>

export interface GW2Pet extends GW2BaseRecord<number> {
  name: string;
  description: string;
  icon: string;
  skills: Array<GW2PetSkill>;
}
