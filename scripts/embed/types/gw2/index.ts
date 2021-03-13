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
  [GW2Resources.ITEMS]: [number, GW2Item, Error];
  [GW2Resources.ITEM_STATS]: [number, GW2ItemStat, Error];
  [GW2Resources.PETS]: [number, GW2Pet, Error];
  [GW2Resources.PROFESSIONS]: [string, GW2Profession, Error];
  [GW2Resources.SKILLS]: [number, GW2Skill, Error];
  [GW2Resources.SPECIALIZATIONS]: [number, GW2Specialization, Error];
  [GW2Resources.TRAITS]: [number, GW2Trait, Error]
}

export const enum GW2AsyncState {
  DONE = 'DONE',
  FAILED = 'FAILED',
  PENDING = 'PENDING'
}

export const enum GW2Resources {
  ITEMS = 'GW2_ITEMS',
  ITEM_STATS = 'GW2_ITEM_STATS',
  PETS = 'GW2_PETS',
  PROFESSIONS = 'GW2_PROFESSIONS',
  SKILLS = 'GW2_SKILLS',
  SPECIALIZATIONS = 'GW2_SPECIALIZATIONS',
  TRAITS = 'GW2_TRAITS'
}

export type GW2ItemsState = ExtractGW2State<GW2Resources.ITEMS>
export type GW2ItemStatsState = ExtractGW2State<GW2Resources.ITEM_STATS>
export type GW2PetsState = ExtractGW2State<GW2Resources.PETS>
export type GW2ProfessionsState = ExtractGW2State<GW2Resources.PROFESSIONS>
export type GW2SkillsState = ExtractGW2State<GW2Resources.SKILLS>
export type GW2SpecializationsState = ExtractGW2State<GW2Resources.SPECIALIZATIONS>
export type GW2TraitsState = ExtractGW2State<GW2Resources.TRAITS>

export type ExtractGW2State<T extends GW2Resources> = Record<ExtractGW2KeyType<T>, GW2AsyncRecord<ExtractGW2ResourceType<T>, ExtractGW2ErrorType<T>>>

export type ExtractGW2KeyType<T extends GW2Resources> = GW2ResourceMapping extends Pick<GW2ResourceMapping, T> ? GW2ResourceMapping[T][0] : never
export type ExtractGW2ResourceType<T extends GW2Resources> = GW2ResourceMapping extends Pick<GW2ResourceMapping, T> ? GW2ResourceMapping[T][1] : never
export type ExtractGW2ErrorType<T extends GW2Resources> = GW2ResourceMapping extends Pick<GW2ResourceMapping, T> ? GW2ResourceMapping[T][2] : never
