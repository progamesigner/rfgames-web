import { makeAttributeName } from '../libs'
import { TraitMode, TraitPosition, TraitSelection } from '../containers'

export function extractBoolean(element: Element, name: string, defaultValue: boolean): boolean {
  const value = element.getAttribute(makeAttributeName(name))
  return value ? value === 'true' || value === '1' || value === 'on' || value === 'yes' : defaultValue
}

export function extractNumber(element: Element, name: string, defaultValue: number): number {
  const value = element.getAttribute(makeAttributeName(name))
  return value ? parseInt(value, 10) : defaultValue
}

export function extractString(element: Element, name: string, defaultValue: string): string {
  return element.getAttribute(makeAttributeName(name)) || defaultValue
}

export function extractNumberList(element: Element, name: string): ReadonlyArray<number> {
  return extractStringList(element, name).map(value => parseInt(value, 10))
}

export function extractStringList(element: Element, name: string): ReadonlyArray<string> {
  const value = element.getAttribute(makeAttributeName(name))
  return value ? value.split(',').map(value => value.trim()) : []
}

export function parseSelectedTrait(trait: string): TraitSelection {
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

export function parseTraitlines(
  traitlines: ReadonlyArray<string>
): Record<number, ReadonlyArray<TraitSelection>> {
  return traitlines.reduce((traitlines, traitline) => {
    const [id, ...selections] = traitline.split('|')
    return {
      ...traitlines,
      [parseInt(id, 10)]: selections.map(parseSelectedTrait)
    }
  }, {})
}
