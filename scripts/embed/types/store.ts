import { Action, Store } from 'redux'
import { types } from 'typestyle'

import {
  ExtractGW2KeyType,
  ExtractGW2ResourceType,
  ExtractGW2State,
  GW2Resources
} from './gw2'
import { TooltipState } from './tooltip'

type EmbedResourceRecord<T extends GW2Resources> = Record<ExtractGW2KeyType<T>, ExtractGW2ResourceType<T>>;

interface EmbedResources {
  [GW2Resources.ITEMS]: EmbedResourceRecord<GW2Resources.ITEMS>;
  [GW2Resources.ITEM_STATS]: EmbedResourceRecord<GW2Resources.ITEM_STATS>;
  [GW2Resources.PETS]: EmbedResourceRecord<GW2Resources.PETS>;
  [GW2Resources.PROFESSIONS]: EmbedResourceRecord<GW2Resources.PROFESSIONS>;
  [GW2Resources.SKILLS]: EmbedResourceRecord<GW2Resources.SKILLS>;
  [GW2Resources.SPECIALIZATIONS]: EmbedResourceRecord<GW2Resources.SPECIALIZATIONS>;
  [GW2Resources.TRAITS]: EmbedResourceRecord<GW2Resources.TRAITS>;
}

export interface EmbedOptions {
  cacheVersion: string;
  language: string;
  resources: Partial<EmbedResources>;
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
