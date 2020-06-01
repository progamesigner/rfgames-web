type AttributeParser<T> = (value: string | null) => T
type OptionAttributes = { [key: string]: boolean | number | string; }

export function parseNumberAttribute(value: string | null): number {
  return parseInt(value || '', 10)
}

export function parseBooleanAttribute(value: string | null): boolean {
  return value === 'true' || value === '1' || value === 'on' || value ==='yes'
}

export function parseListAttribute<T>(
  value: string,
  parser: AttributeParser<T>
): Array<T> {
  return value.split(',').map(parser)
}

export function makeAttributeName(name: string): string {
  return `data-embed-${name}`
}

export function extractOptionAttributes(element: Element): OptionAttributes {
  const enableInline = parseBooleanAttribute(element.getAttribute(makeAttributeName('enable-inline')))
  const enableLink = parseBooleanAttribute(element.getAttribute(makeAttributeName('enable-link')))
  const enableName = parseBooleanAttribute(element.getAttribute(makeAttributeName('enable-name')))
  const enableNameLink = parseBooleanAttribute(element.getAttribute(makeAttributeName('enable-name-link')))

  return {
    enableInline,
    enableLink,
    enableName,
    enableNameLink
  }
}
