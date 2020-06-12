import { GW2Record } from './base'

export interface GW2Specialization extends GW2Record<number> {
  name: string;
  profession: string;
  elite: boolean;
  icon: string;
  background: string;
  minor_traits: Array<number>;
  major_traits: Array<number>;
  weapon_trait?: number;
  profession_icon?: string;
  profession_icon_big?: string;
}
