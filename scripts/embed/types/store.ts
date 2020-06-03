import { Action, Store } from 'redux'

import {
  GW2ItemsState,
  GW2ItemStatsState,
  GW2PetsState,
  GW2ProfessionsState,
  GW2SkillsState,
  GW2SpecializationsState,
  GW2TraitsState
} from './gw2'
import { TooltipState } from './tooltip'

export type EmbedState = {
  cacheVersion?: string;
  items?: GW2ItemsState;
  itemstates?: GW2ItemStatsState;
  language?: string;
  pets?: GW2PetsState;
  professions?: GW2ProfessionsState;
  skills?: GW2SkillsState;
  specializations?: GW2SpecializationsState;
  tooltip?: TooltipState;
  traits?: GW2TraitsState;
  useLocalStorageAsCache?: boolean;
  [key: string]: unknown;
}

export type EmbedStore = Store<EmbedState, Action<string>>
