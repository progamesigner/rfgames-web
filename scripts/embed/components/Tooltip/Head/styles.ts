import { colors, em, fonts, layouts, style } from '../../styles'

export const root = style({
  ...fonts.tooltipHead,
  color: colors.tooltipTitle.toString(),
  $nest: {
    '&:not(:last-child)': {
      marginBottom: em(layouts.gap)
    }
  }
})
