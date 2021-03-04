import { colors, em, fonts, layouts, style } from '../../styles'

export const root = style({
  ...fonts.tooltipFoot,
  color: colors.tooltipText.toString(),
  $nest: {
    '&:not(:last-child)': {
      marginBottom: em(layouts.gap)
    }
  }
})
