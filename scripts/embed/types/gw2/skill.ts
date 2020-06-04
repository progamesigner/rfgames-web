import { GW2Record } from './base'
import { GW2Fact, GW2TraitedFact } from './fact'

export const enum GW2SkillAttunement {
  Air = 'Air',
  Earth = 'Earth',
  Fire = 'Fire',
  Water = 'Water'
}

export const enum GW2SkillCategory {
  DualWield = 'DualWield',
  StealthAttack = 'StealthAttack'
}

export const enum GW2SkillSlot {
  DOWNED_1 = 'Downed_1',
  DOWNED_2 = 'Downed_2',
  DOWNED_3 = 'Downed_3',
  DOWNED_4 = 'Downed_4',
  DOWNED_5 = 'Downed_5',
  ELITE = 'Elite',
  HEAL = 'Heal',
  PET = 'Pet',
  PROFESSION_1 = 'Profession_1',
  PROFESSION_2 = 'Profession_2',
  PROFESSION_3 = 'Profession_3',
  PROFESSION_4 = 'Profession_4',
  PROFESSION_5 = 'Profession_5',
  PROFESSION_6 = 'Profession_6',
  UTILITY = 'Utility',
  WEAPON_1 = 'Weapon_1',
  WEAPON_2 = 'Weapon_2',
  WEAPON_3 = 'Weapon_3',
  WEAPON_4 = 'Weapon_4',
  WEAPON_5 = 'Weapon_5'
}

export const enum GW2SkillType {
  BUNDLE = 'Bundle',
  ELITE = 'Elite',
  HEAL = 'Heal',
  PROFESSION = 'Profession',
  UTILITY = 'Utility',
  WEAPON = 'Weapon'
}

export interface GW2Skill extends GW2Record<number> {
  name: string;
  description: string;
  icon: string;
  chat_link: string;
  type: GW2SkillType;
  weapon_type: string;
  professions: Array<string>;
  slot: GW2SkillSlot;
  facts: Array<GW2Fact>;
  traited_facts: Array<GW2TraitedFact>;
  categories: Array<GW2SkillCategory | string>;
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
