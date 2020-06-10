export * from 'typestyle'
export * from 'csx'

export { classes as cx } from 'typestyle'

export function polygon(points: Array<string>): string {
  return `polygon(${points.join(', ')})`
}
