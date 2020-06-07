import { round } from 'lodash/fp'

import { makeClassName, cx } from '../libs'

import * as styles from './styles'

const CLOSE_TAG = '~~~CLOSE~TAG~~~'
const OPEN_TAG = '~~~OPEN~TAG~~~'

const CLOSE_TAG_REGEXP = new RegExp(CLOSE_TAG, 'g')
const OPEN_TAG_REGEXP = new RegExp(OPEN_TAG, 'g')

const GT_SYMBOL_REGEX = />/g
const HEX_COLOR_REGEX = /<c=#([^>]+)>([^]*?)(<\/?c>|$)/g
const LT_SYMBOL_REGEX = /</g
const NAMED_COLOR_REGEX = /<c[=@][@=]?([^>]+)>([^]*?)(<\/?c>|$)/g
const NEW_LINE_REGEX = /<br\/?>|\n/g
const SKILL_TYPE_REGEX = /^([a-zA-Z\u00C0-\u017F]+ ?[a-zA-Z\u00C0-\u017F]*.?[:.])/gm

const ATTRIBUTE_MAPPING = {
  BoonDuration: 'concentration',
  ConditionDuration: 'expertise',
  CritDamage: 'ferocity',
  CriticalDamage: 'ferocity'
} as Record<string, string>

const BASE_DAMAGE = 266.0

export function addSkillTypeTags(description: string): string {
  return description.replace(SKILL_TYPE_REGEX, '<c=@skill>$1</c>')
}

export function attributeToName(attribute: string): string {
  return ATTRIBUTE_MAPPING[attribute] || attribute
}

export function calculateDamage(hitCount: number, damageMultiplier = 1): number {
  return round(BASE_DAMAGE * damageMultiplier * hitCount)
}

export function markup(text: string): string {
  return text
    .replace(HEX_COLOR_REGEX, `${OPEN_TAG}span class="${cx(styles.format, makeClassName('color-format'))}" style="color:$1"${CLOSE_TAG}$2${OPEN_TAG}/span${CLOSE_TAG}`)
    .replace(NAMED_COLOR_REGEX, `${OPEN_TAG}span class="${cx(styles.format, makeClassName('color-format'))} is-$1"${CLOSE_TAG}$2${OPEN_TAG}/span${CLOSE_TAG}`)
    .replace(NEW_LINE_REGEX, `${OPEN_TAG}br${CLOSE_TAG}`)
    .replace(LT_SYMBOL_REGEX, '&lt;')
    .replace(GT_SYMBOL_REGEX, '&gt;')
    .replace(OPEN_TAG_REGEXP, '<')
    .replace(CLOSE_TAG_REGEXP, '>')
}
