import { GW2BaseRecord } from './base'
import { GW2ItemWeaponType } from './item'
import { GW2SkillType, GW2SkillSlot } from './skill'

type GW2ProfessionFlag = 'NoRacialSkills' | 'NoWeaponSwap'
type GW2ProfessionTrainingCategory = 'Skills' | 'Specializations' | 'EliteSpecializations'
type GW2ProfessionTrainingTrackType = 'Trait' | 'Skill'
type GW2ProfessionWeaponFlag = 'Mainhand' | 'Offhand' | 'TwoHand' | 'Aquatic'

type GW2ProfessionWeaponList = {
  [key in GW2ItemWeaponType]: GW2ProfessionWeapon
}

type GW2ProfessionSkill = GW2BaseRecord<number> & {
  slot: GW2SkillSlot;
  type: GW2SkillType;
  offhand: string;
  attunement: string;
  source: string;
}

type GW2ProfessionTraining = GW2BaseRecord<number> & {
  category: GW2ProfessionTrainingCategory;
  name: string;
  track: Array<GW2ProfessionTrainingTrack>;
}

type GW2ProfessionTrainingTrack = {
  cost: number;
  type: GW2ProfessionTrainingTrackType;
  skill_id: number;
  trait_id: number;
}

type GW2ProfessionWeapon = {
  specialization: number;
  flag: Array<GW2ProfessionWeaponFlag>;
  skills: Array<GW2ProfessionSkill>
}

export type GW2Profession = GW2BaseRecord<string> & {
  name: string;
  icon: string;
  icon_big: string;
  specializations: Array<number>;
  training: Array<GW2ProfessionTraining>;
  weapons: GW2ProfessionWeaponList;
  flags: Array<GW2ProfessionFlag>;
  skills: Array<GW2ProfessionSkill>;
}
