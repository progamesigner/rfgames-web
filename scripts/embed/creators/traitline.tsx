import * as m from 'mithril'

import {
  TraitLine,
  TraitMode,
  TraitPosition,
  TraitSelection
} from '../containers'
import { EmbedStore } from '../types'

import {
  extractBoolean,
  extractNumber,
  extractStringList,
  extractString
} from './extractor'

function parseSelectedTrait(trait: string): TraitSelection {
  const traitId = parseInt(trait)

  if (Number.isNaN(traitId)) {
    switch (trait.toLowerCase()) {
      case 't':
      case 'top':
      case 'u':
      case 'upper':
        return [TraitMode.POSITION, TraitPosition.TOP]
      case 'center':
      case 'm':
      case 'mid':
      case 'middle':
        return [TraitMode.POSITION, TraitPosition.MIDDLE]
      case 'b':
      case 'bottom':
      case 'lower':
        return [TraitMode.POSITION, TraitPosition.BOTTOM]
      case 'n':
      case 'none':
      case '':
      default:
        return [TraitMode.POSITION, TraitPosition.NONE]
    }
  }

  return [TraitMode.ID, traitId]
}

export function create(store: EmbedStore, element: Element): m.Component {
  const attrs = {
    id: extractNumber(element, 'id', -1),

    overrideEmptyText: extractString(element, 'empty-text', ''),
    disableTooltip: extractBoolean(element, 'disable-tooltip', false),

    selectedTraits: extractStringList(element, 'traits').map(parseSelectedTrait)
  }

  return {
    view(): m.Children {
      return <TraitLine {...attrs} store={store}></TraitLine>
    }
  }
}
