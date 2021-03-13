import { Action, Store } from 'redux'
import { types } from 'typestyle'

import { ExtractGW2State, GW2Resources } from './gw2'
import { TooltipState } from './tooltip'

export interface EmbedOptions {
  cacheVersion: string;
  language: string;
  useLocalStorageAsCache: boolean;
}

export interface EmbedState extends Partial<EmbedOptions> {
  [GW2Resources.ITEMS]?: ExtractGW2State<GW2Resources.ITEMS>;
  [GW2Resources.ITEM_STATS]?: ExtractGW2State<GW2Resources.ITEM_STATS>;
  [GW2Resources.PETS]?: ExtractGW2State<GW2Resources.PETS>;
  [GW2Resources.PROFESSIONS]?: ExtractGW2State<GW2Resources.PROFESSIONS>;
  [GW2Resources.SKILLS]?: ExtractGW2State<GW2Resources.SKILLS>;
  [GW2Resources.SPECIALIZATIONS]?: ExtractGW2State<GW2Resources.SPECIALIZATIONS>;
  [GW2Resources.TRAITS]?: ExtractGW2State<GW2Resources.TRAITS>;
  tooltip?: TooltipState;
  tooltipHidable?: boolean;
  tooltipStyles?: types.CSSProperties;
  [key: string]: unknown;
}

export type EmbedStore = Store<EmbedState, Action<string>>
