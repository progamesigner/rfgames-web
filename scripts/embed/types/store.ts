import { Action } from 'redux'

import {
  GW2Item,
  GW2ItemStat,
  GW2Pet,
  GW2Profession,
  GW2Skill,
  GW2Specialization,
  GW2Trait
} from './gw2'

export enum AsyncState {
  PENDING,
  DONE,
  FAILED
}

export interface AsyncRecord<T, E extends Error> {
  state: AsyncState;
  data: T | null;
  error: E | null;
}

export interface BaseAction<T> extends Action<string> {
  payload: T;
}

export interface EmbedState {
  items?: Record<string, AsyncRecord<GW2Item, Error>>;
  itemstates?: Record<string, AsyncRecord<GW2ItemStat, Error>>;
  language?: string;
  pets?: Record<string, AsyncRecord<GW2Pet, Error>>;
  professions?: Record<string, AsyncRecord<GW2Profession, Error>>;
  skills?: Record<string, AsyncRecord<GW2Skill, Error>>;
  specializations?: Record<string, AsyncRecord<GW2Specialization, Error>>;
  traits?: Record<string, AsyncRecord<GW2Trait, Error>>;
  useLocalStorageAsCache?: boolean;
  [key: string]: unknown;
}
