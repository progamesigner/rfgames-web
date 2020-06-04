import { GW2Record } from './base'
import { GW2ItemWeaponType } from './item'
import { GW2SkillType, GW2SkillSlot } from './skill'

type GW2ProfessionWeaponList = {
  [key in GW2ItemWeaponType]: GW2ProfessionWeapon
}

interface GW2ProfessionSkill extends GW2Record<number> {
  slot: GW2SkillSlot;
  type: GW2SkillType;
  offhand: string;
  attunement: string;
  source: string;
}

interface GW2ProfessionTraining extends GW2Record<number> {
  category: GW2ProfessionTrainingCategory;
  name: string;
  track: Array<GW2ProfessionTrainingTrack>;
}

interface GW2ProfessionTrainingTrack {
  cost: number;
  type: GW2ProfessionTrainingTrackType;
  skill_id: number;
  trait_id: number;
}

interface GW2ProfessionWeapon {
  specialization: number;
  flag: Array<GW2ProfessionWeaponFlag>;
  skills: Array<GW2ProfessionSkill>
}

export const enum GW2ProfessionFlag {
  NO_RACIAL_SKILLS = 'NoRacialSkills',
  NO_WEAPON_SWAP = 'NoWeaponSwap'
}

export const enum GW2ProfessionTrainingCategory {
  SKILLS = 'Skills',
  SPECIALIZATIONS = 'Specializations',
  ELITE_SPECIALIZATIONS = 'EliteSpecializations'
}

export const enum GW2ProfessionTrainingTrackType {
  SKILL = 'Skill',
  TRAIT = 'Trait'
}

export const enum GW2ProfessionWeaponFlag {
  AQUATIC = 'Aquatic',
  MAIN_HAND = 'Mainhand',
  OFF_HAND = 'Offhand',
  TWO_HAND = 'TwoHand'
}

export interface GW2Profession extends GW2Record<string> {
  name: string;
  icon: string;
  icon_big: string;
  specializations: Array<number>;
  training: Array<GW2ProfessionTraining>;
  weapons: GW2ProfessionWeaponList;
  flags: Array<GW2ProfessionFlag>;
  skills: Array<GW2ProfessionSkill>;
}
