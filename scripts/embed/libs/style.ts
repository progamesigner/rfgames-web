export * from 'typestyle'
export * from 'csx'

export { classes as cx } from 'typestyle'

export function polygon(points: ReadonlyArray<string>): string {
  return `polygon(${points.join(', ')})`
}
