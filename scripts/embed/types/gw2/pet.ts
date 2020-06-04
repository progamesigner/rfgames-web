import { GW2Record } from './base'

type GW2PetSkill = GW2Record<number>

export interface GW2Pet extends GW2Record<number> {
  name: string;
  description: string;
  icon: string;
  skills: Array<GW2PetSkill>;
}
