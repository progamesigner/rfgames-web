import { Store } from 'redux'

import { EmbedState } from './store'

interface ContainerAttributes {
  classes?: string | Array<string>;
}

interface StoreAttributes {
  store: Store<EmbedState>
}

export interface EmbedAttributes {
  enableInline: boolean;
  enableLink: boolean;
  enableName: boolean;
  enableNameLink: boolean;
}

export interface EmbedOptions {
  cacheVersion: string;
  language: string;
  useLocalStorageAsCache: boolean;
}

export type ConnectedAttributes<
  Attrs extends EmbedAttributes
> = Attrs & ContainerAttributes & StoreAttributes
