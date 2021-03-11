import * as m from 'mithril'

import { TraitLine } from '../containers'
import { EmbedStore } from '../types'

import {
  extractBoolean,
  extractNumber,
  extractString,
  extractStringList,
  parseSelectedTrait,
  parseTraitlines
} from './libs'

export function create(store: EmbedStore, element: Element): m.Component {
  const attrs = {
    id: extractNumber(element, 'id', -1),

    overrideEmptyText: extractString(element, 'empty-text', ''),
    disableTooltip: extractBoolean(element, 'disable-tooltip', false),

    activeTraitlines: parseTraitlines(extractStringList(element, 'active-traitlines')),
    selectedTraits: extractStringList(element, 'traits').map(parseSelectedTrait)
  }

  return {
    view(): m.Children {
      return <TraitLine {...attrs} store={store}></TraitLine>
    }
  }
}
