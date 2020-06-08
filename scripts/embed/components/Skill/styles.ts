import { color, style, stylesheet } from '../../libs'

export const icon = style()

export const link = style()

export const name = style()

export const flavors = stylesheet({
  abilitytype: {
    color: color('#efdf80').toString()
  },
  reminder: {
    color: color('rgba(255, 255, 255, 0.7)').toString()
  },
  skilltype: {
    color: color('#ffc90e').toString()
  }
})
