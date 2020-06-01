import { Store } from 'redux'

import { EmbedState } from './store'

type ClassValue = boolean | null | number | string | undefined | { [index: number]: ClassValue; } | { [classname: string]: ClassValue; }

export interface EmbedContainerAttributes<T> {
  id: T;
  store: Store<EmbedState>;
}

export interface EmbedAttributes {
  classes?: false | null | string | { [index: string]: ClassValue; };
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
