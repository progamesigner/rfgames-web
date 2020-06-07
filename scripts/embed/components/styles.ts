import { color, style } from '../libs'

export * from '../libs'

export const gapSize = 0.25

export const iconLargeSize = 4
export const iconMediumSize = 4
export const iconSmallSize = 3
export const iconMiniSize = 2
export const iconMicroSize = 1

export const iconApplyCountPadding = 0.25
export const iconApplyCountFontSize = 0.75
export const iconApplyCountTextShadow = 0.75

export const format = style({
  $nest: {
    '&.is-abilitytype': {
      color: color('#efdf80').toString()
    },
    '&.is-flavor': {
      color: color('#94dcd2').toString()
    },
    '&.is-reminder': {
      color: color('rgba(255, 255, 255, 0.7)').toString()
    },
    '&.is-skill': {
      color: color('#ffc90e').toString()
    }
  }
})
