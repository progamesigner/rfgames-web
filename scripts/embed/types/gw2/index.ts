import { GW2Record, GW2RecordKey } from './base'
import { GW2Item } from './item'
import { GW2ItemStat } from './itemstat'
import { GW2Pet } from './pet'
import { GW2Profession } from './profession'
import { GW2Skill } from './skill'
import { GW2Specialization } from './specialization'
import { GW2Trait } from './trait'

export * from './base'
export * from './fact'
export * from './item'
export * from './itemstat'
export * from './pet'
export * from './profession'
export * from './skill'
export * from './specialization'
export * from './trait'

type GW2AsyncRecord<T, E extends Error> = {
  state: GW2AsyncState;
  data: T | null;
  error: E | null;
}

export const enum GW2AsyncState {
  PENDING,
  DONE,
  FAILED
}

export const enum GW2Resources {
  ITEM = 'GW2_ITEM',
  ITEM_STAT = 'GW2_ITEM_STAT',
  PET = 'GW2_PET',
  PROFESSION = 'GW2_PROFESSION',
  SKILL = 'GW2_SKILL',
  SPECIALIZATION = 'GW2_SPECIALIZATION',
  TRAIT = 'GW2_TRAIT'
}

export type GW2State<
  T extends GW2RecordKey,
  R extends GW2Record<T>,
  E extends Error = Error
> = Record<T, GW2AsyncRecord<R, E>>

export type GW2ItemsState = GW2State<number, GW2Item, Error>
export type GW2ItemStatsState = GW2State<number, GW2ItemStat, Error>
export type GW2PetsState = GW2State<number, GW2Pet, Error>
export type GW2ProfessionsState = GW2State<string, GW2Profession, Error>
export type GW2SkillsState = GW2State<number, GW2Skill, Error>
export type GW2SpecializationsState = GW2State<number, GW2Specialization, Error>
export type GW2TraitsState = GW2State<number, GW2Trait, Error>
