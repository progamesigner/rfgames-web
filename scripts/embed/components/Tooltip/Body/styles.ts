import { colors, em, fonts, layouts, style } from '../../styles'

export const root = style({
  ...fonts.tooltipBody,
  color: colors.tooltipText.toString(),
  whiteSpace: 'pre-wrap',
  $nest: {
    '&:not(:last-child)': {
      marginBottom: em(layouts.gap)
    }
  }
})
