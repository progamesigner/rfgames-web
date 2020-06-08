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

interface GW2AsyncRecord<R, E> {
  state: GW2AsyncState;
  data: R | null;
  error: E | null;
}

interface GW2ResourceMapping {
  [GW2Resources.ITEM]: [number, GW2Item, Error];
  [GW2Resources.ITEM_STAT]: [number, GW2ItemStat, Error];
  [GW2Resources.PET]: [number, GW2Pet, Error];
  [GW2Resources.PROFESSION]: [string, GW2Profession, Error];
  [GW2Resources.SKILL]: [number, GW2Skill, Error];
  [GW2Resources.SPECIALIZATION]: [number, GW2Specialization, Error];
  [GW2Resources.TRAIT]: [number, GW2Trait, Error]
}

export const enum GW2AsyncState {
  DONE = 'DONE',
  FAILED = 'FAILED',
  PENDING = 'PENDING'
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

export type GW2ItemsState = ExtractGW2State<GW2Resources.ITEM>
export type GW2ItemStatsState = ExtractGW2State<GW2Resources.ITEM_STAT>
export type GW2PetsState = ExtractGW2State<GW2Resources.PET>
export type GW2ProfessionsState = ExtractGW2State<GW2Resources.PROFESSION>
export type GW2SkillsState = ExtractGW2State<GW2Resources.SKILL>
export type GW2SpecializationsState = ExtractGW2State<GW2Resources.SPECIALIZATION>
export type GW2TraitsState = ExtractGW2State<GW2Resources.TRAIT>

export type ExtractGW2State<T extends GW2Resources> = Record<ExtractGW2KeyType<T>, GW2AsyncRecord<ExtractGW2ResourceType<T>, ExtractGW2ErrorType<T>>>

export type ExtractGW2KeyType<T extends GW2Resources> = GW2ResourceMapping extends Pick<GW2ResourceMapping, T> ? GW2ResourceMapping[T][0] : never
export type ExtractGW2ResourceType<T extends GW2Resources> = GW2ResourceMapping extends Pick<GW2ResourceMapping, T> ? GW2ResourceMapping[T][1] : never
export type ExtractGW2ErrorType<T extends GW2Resources> = GW2ResourceMapping extends Pick<GW2ResourceMapping, T> ? GW2ResourceMapping[T][2] : never
