export { attributeToName, markup } from '../../libs'

const baseDamage = 266.00

export function calculateFactDamage(hitCount: number, multiplier = 1): number {
  return Math.round(baseDamage * multiplier * hitCount)
}
