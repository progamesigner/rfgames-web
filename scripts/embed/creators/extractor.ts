import { makeAttributeName } from '../libs'

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

export function extractNumberList(element: Element, name: string): Array<number> {
  return extractStringList(element, name).map(value => parseInt(value, 10))
}

export function extractStringList(element: Element, name: string): Array<string> {
  const value = element.getAttribute(makeAttributeName(name))
  return value ? value.split(',').map(value => value.trim()) : []
}
