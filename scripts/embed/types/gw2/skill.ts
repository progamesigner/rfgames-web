import { GW2BaseRecord } from './base'
import { GW2Fact, GW2TraitedFact } from './fact'

type GW2SkillAttunement = 'Fire' | 'Water' | 'Air' | 'Earth'
type GW2SkillCategory = 'DualWield' | 'StealthAttack' | string

export type GW2SkillSlot = 'Downed_1' | 'Downed_2' | 'Downed_3' | 'Downed_4' | 'Downed_5' | 'Elite' | 'Heal' | 'Pet' | 'Profession_1' | 'Profession_2' | 'Profession_3' | 'Profession_4' | 'Profession_5' | 'Profession_6' | 'Utility' | 'Weapon_1' | 'Weapon_2' | 'Weapon_3' | 'Weapon_4' | 'Weapon_5'
export type GW2SkillType = 'Bundle' | 'Elite' | 'Heal' | 'Profession' | 'Utility' |'Weapon'

export interface GW2Skill extends GW2BaseRecord<number> {
  name: string;
  description: string;
  icon: string;
  chat_link: string;
  type: GW2SkillType;
  weapon_type: string;
  professions: Array<string>;
  slot: string;
  facts: Array<GW2Fact>;
  traited_facts: Array<GW2TraitedFact>;
  categories: Array<GW2SkillCategory>;
  attunement?: GW2SkillAttunement;
  cost?: number;
  dual_wield?: string;
  flip_skill?: number;
  initiative?: number;
  next_chain?: number;
  prev_chain?: number;
  transform_skills?: Array<number>;
  bundle_skills?: Array<number>;
  toolbelt_skill?: number;
}
