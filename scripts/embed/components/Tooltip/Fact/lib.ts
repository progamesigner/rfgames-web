export { attributeToName, markup } from '../../lib'

const baseDamage = 266.00

export function calculateFactDamage(hitCount: number, multiplier = 1): number {
  return Math.round(baseDamage * multiplier * hitCount)
}
