import { GW2RecordKey } from './gw2'
import { EmbedStore } from './store'

export type HasIDAttributes<T extends GW2RecordKey> = {
  id: T;
}

export type HasRenderAttributes = {
  disableIcon: boolean;
  disableText: boolean;
  disableLink: boolean;
  inline: boolean;
}

export type HasStoreAttributes = {
  store: EmbedStore;
}

export type HasTooltipAttributes = {
  disableTooltip: boolean;
}

export type HasWindowAttributes = {
  window: Window;
}
