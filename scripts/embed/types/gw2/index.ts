import { AsyncState } from '../action'

import { GW2BaseRecord, GW2RecordKey } from './base'
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
  state: AsyncState;
  data: T | null;
  error: E | null;
}

export type GW2State<
  T extends GW2RecordKey,
  R extends GW2BaseRecord<T>,
  E extends Error = Error
> = Record<T, GW2AsyncRecord<R, E>>

export type GW2ItemsState = GW2State<number, GW2Item, Error>
export type GW2ItemStatsState = GW2State<number, GW2ItemStat, Error>
export type GW2PetsState = GW2State<number, GW2Pet, Error>
export type GW2ProfessionsState = GW2State<string, GW2Profession, Error>
export type GW2SkillsState = GW2State<number, GW2Skill, Error>
export type GW2SpecializationsState = GW2State<number, GW2Specialization, Error>
export type GW2TraitsState = GW2State<number, GW2Trait, Error>
