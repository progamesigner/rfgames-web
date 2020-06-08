import { Action, Store } from 'redux'

import {
  GW2ItemsState,
  GW2ItemStatsState,
  GW2PetsState,
  GW2ProfessionsState,
  GW2Resources,
  GW2SkillsState,
  GW2SpecializationsState,
  GW2TraitsState
} from './gw2'
import { TooltipState } from './tooltip'

export interface EmbedOptions {
  cacheVersion: string;
  language: string;
  useLocalStorageAsCache: boolean;
}

export interface EmbedState extends Partial<EmbedOptions> {
  [GW2Resources.ITEM_STAT]?: GW2ItemStatsState;
  [GW2Resources.ITEM]?: GW2ItemsState;
  [GW2Resources.PET]?: GW2PetsState;
  [GW2Resources.PROFESSION]?: GW2ProfessionsState;
  [GW2Resources.SKILL]?: GW2SkillsState;
  [GW2Resources.SPECIALIZATION]?: GW2SpecializationsState;
  [GW2Resources.TRAIT]?: GW2TraitsState;
  tooltip?: TooltipState;
  [key: string]: unknown;
}

export type EmbedStore = Store<EmbedState, Action<string>>
