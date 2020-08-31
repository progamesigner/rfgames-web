import { Action, Store } from 'redux'

import { ExtractGW2State, GW2Resources } from './gw2'
import { TooltipState } from './tooltip'

export interface EmbedOptions {
  cacheVersion: string;
  language: string;
  useLocalStorageAsCache: boolean;
}

export interface EmbedState extends Partial<EmbedOptions> {
  [GW2Resources.ITEM_STAT]?: ExtractGW2State<GW2Resources.ITEM_STAT>;
  [GW2Resources.ITEM]?: ExtractGW2State<GW2Resources.ITEM>;
  [GW2Resources.PET]?: ExtractGW2State<GW2Resources.PET>;
  [GW2Resources.PROFESSION]?: ExtractGW2State<GW2Resources.PROFESSION>;
  [GW2Resources.SKILL]?: ExtractGW2State<GW2Resources.SKILL>;
  [GW2Resources.SPECIALIZATION]?: ExtractGW2State<GW2Resources.SPECIALIZATION>;
  [GW2Resources.TRAIT]?: ExtractGW2State<GW2Resources.TRAIT>;
  tooltip?: TooltipState;
  tooltipHidable?: boolean;
  [key: string]: unknown;
}

export type EmbedStore = Store<EmbedState, Action<string>>
