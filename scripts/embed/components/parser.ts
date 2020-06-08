import { round } from 'lodash/fp'

import { makeClassName, cx } from '../libs'

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

interface MarkupFlavorMap {
  [property: string]: string | null;
}

export function addSkillTypeTags(description: string): string {
  return description.replace(SKILL_TYPE_REGEX, '<c=@skilltype>$1</c>')
}

export function attributeToName(attribute: string): string {
  return ATTRIBUTE_MAPPING[attribute] || attribute
}

export function calculateDamage(hitCount: number, damageMultiplier = 1): number {
  return round(BASE_DAMAGE * damageMultiplier * hitCount)
}

export function markup(text: string, flavors: MarkupFlavorMap = {}): string {
  return text
    .replace(HEX_COLOR_REGEX, (_, color, text) => {
      return `${OPEN_TAG}span class="${makeClassName('color-format')}" style="color:${color}"${CLOSE_TAG}${text}${OPEN_TAG}/span${CLOSE_TAG}`
    })
    .replace(NAMED_COLOR_REGEX, (_, flavor, text) => {
      return `${OPEN_TAG}span class="${cx(flavors[flavor] || flavor, makeClassName('color-format'))} is-${flavor}"${CLOSE_TAG}${text}${OPEN_TAG}/span${CLOSE_TAG}`
    })
    .replace(NEW_LINE_REGEX, `${OPEN_TAG}br${CLOSE_TAG}`)
    .replace(LT_SYMBOL_REGEX, '&lt;')
    .replace(GT_SYMBOL_REGEX, '&gt;')
    .replace(OPEN_TAG_REGEXP, '<')
    .replace(CLOSE_TAG_REGEXP, '>')
}
