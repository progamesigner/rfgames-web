import { EmbedAttributes } from '../types'

type AttrParser<T> = (value: string | null) => T

export const attrDefaultParser = attrNumberParser

export function attrNumberParser(value: string | null): number {
  return parseInt(value || '', 10)
}

export function attrBooleanParser(value: string | null): boolean {
  return value === 'true' || value === '1' || value === 'on' || value ==='yes'
}

export function attrListParse<T>(
  value: string,
  parser: AttrParser<T>
): Array<T> {
  return value.split(',').map(parser)
}

export function makeAttrName(name: string): string {
  return `data-embed-${name}`
}

export function extractEmbedAttrs(element: Element): EmbedAttributes {
  const enableInline = attrBooleanParser(element.getAttribute(makeAttrName('enable-inline')))
  const enableLink = attrBooleanParser(element.getAttribute(makeAttrName('enable-link')))
  const enableName = attrBooleanParser(element.getAttribute(makeAttrName('enable-name')))
  const enableNameLink = attrBooleanParser(element.getAttribute(makeAttrName('enable-name-link')))

  return {
    enableInline,
    enableLink,
    enableName,
    enableNameLink
  }
}
