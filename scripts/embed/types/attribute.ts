import { EmbedStore } from './store'

type ID = number | string | symbol

export interface HasEmptyTextAttributes {
  overrideEmptyText?: string;
}

export interface HasIconAttributes {
  classIcon?: string;
  classSize?: string;
  disableIcon: boolean;
}

export interface HasIconLinkAttributes extends HasLinkAttributes {
  disableIconLink: boolean;
}

export interface HasIconPlaceholderAttributes {
  disableIconPlaceholder: boolean;
}

export interface HasIDAttributes<T extends ID> {
  id: T;
}

export interface HasInlineAttributes {
  inline: boolean;
}

export interface HasLinkAttributes {
  link?: string;
}

export interface HasStoreAttributes {
  store: EmbedStore;
}

export interface HasTextAttributes {
  classText?: string;
  disableText: boolean;
  overrideText?: string;
}

export interface HasTextLinkAttributes extends HasLinkAttributes {
  disableTextLink: boolean;
}

export interface HasTooltipAttributes {
  disableTooltip: boolean;
}

export interface HasTooltipTextAttributes {
  overrideTooltipText?: string;
}

export interface HasWindowAttributes {
  window: Window;
}
