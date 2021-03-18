import { Action, Store } from 'redux'
import { types } from 'typestyle'

import {
  ExtractGW2KeyType,
  ExtractGW2ResourceType,
  GW2Resources,
  GW2ResourceState
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
  accessToken?: string;
  cacheVersion: string;
  language: string;
  resources: Partial<EmbedResources>;
  schemaVersion: string;
  useLocalStorageAsCache: boolean;
}

export interface EmbedState extends Partial<EmbedOptions> {
  [GW2Resources.ITEMS]?: GW2ResourceState<GW2Resources.ITEMS>;
  [GW2Resources.ITEM_STATS]?: GW2ResourceState<GW2Resources.ITEM_STATS>;
  [GW2Resources.PETS]?: GW2ResourceState<GW2Resources.PETS>;
  [GW2Resources.PROFESSIONS]?: GW2ResourceState<GW2Resources.PROFESSIONS>;
  [GW2Resources.SKILLS]?: GW2ResourceState<GW2Resources.SKILLS>;
  [GW2Resources.SPECIALIZATIONS]?: GW2ResourceState<GW2Resources.SPECIALIZATIONS>;
  [GW2Resources.TRAITS]?: GW2ResourceState<GW2Resources.TRAITS>;
  tooltip?: TooltipState;
  tooltipHidable?: boolean;
  tooltipStyles?: types.CSSProperties;
  [key: string]: unknown;
}

export type EmbedStore = Store<EmbedState, Action<string>>
