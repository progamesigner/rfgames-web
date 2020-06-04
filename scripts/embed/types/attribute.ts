import { GW2RecordKey } from './gw2'
import { EmbedStore } from './store'

export type HasIDAttributes<T extends GW2RecordKey> = {
  id: T;
}

export type HasStoreAttributes = {
  store: EmbedStore;
}
