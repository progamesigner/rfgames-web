import {
  border,
  boxShadow,
  colors,
  em,
  layouts,
  percent,
  style
} from '../../styles'

export const root = style({
  backgroundColor: colors.tooltipBackground.toString(),
  border: border({
    color: colors.tooltipBorder.toString(),
    style: 'solid',
    width: em(layouts.tooltipBorder)
  }),
  boxShadow: boxShadow(colors.tooltipShadow.toString()),
  borderRadius: em(layouts.tooltipRadius),
  padding: em(layouts.gap),
  width: percent(100),
  $nest: {
    '&:not(:last-child)': {
      marginBottom: em(layouts.gap)
    }
  }
})
