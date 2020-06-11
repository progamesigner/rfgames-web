import { cx, makeClassName } from '../libs'

const tagClose = '~~~CLOSE~TAG~~~'
const tagOpen = '~~~OPEN~TAG~~~'

const regexTagClose = new RegExp(tagClose, 'g')
const regexTagOpen = new RegExp(tagOpen, 'g')

const regexColorHex = /<c=#([^>]+)>([^]*?)(<\/?c>|$)/g
const regexColorName = /<c[=@][@=]?([^>]+)>([^]*?)(<\/?c>|$)/g
const regexNewLine = /<br\/?>|\n/g
const regexSymbolGreaterThan = />/g
const regexSymbolLessThan = /</g

interface MarkupFlavorMap {
  [className: string]: string | null;
}

export function attributeToName(attribute: string): string {
  switch (attribute) {
    case 'AgonyResistance':
      return 'Agony Resistance'
    case 'BoonDuration':
      return 'Concentration'
    case 'ConditionDamage':
      return 'Condition Damage'
    case 'ConditionDuration':
      return 'Expertise'
    case 'CritDamage':
    case 'CriticalDamage':
      return 'Ferocity'
    case 'Healing':
      return 'Healing Power'
  }
  return attribute
}

export function markup(text: string, flavors: MarkupFlavorMap = {}): string {
  return text
    .replace(regexColorHex, (_, color, text) => {
      return `${tagOpen}span class="${makeClassName('color-format')}" style="color:${color}"${tagClose}${text}${tagOpen}/span${tagClose}`
    })
    .replace(regexColorName, (_, flavor, text) => {
      return `${tagOpen}span class="${cx(flavors[flavor] || flavor, makeClassName('color-format'))} is-${flavor}"${tagClose}${text}${tagOpen}/span${tagClose}`
    })
    .replace(regexNewLine, `${tagOpen}br${tagClose}`)
    .replace(regexSymbolLessThan, '&lt;')
    .replace(regexSymbolGreaterThan, '&gt;')
    .replace(regexTagOpen, '<')
    .replace(regexTagClose, '>')
}
