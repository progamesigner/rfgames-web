import {
  calc,
  colors,
  em,
  fonts,
  layouts,
  px,
  style,
  textShadow,
  viewWidth,
  zIndices,
  SMALL_SCREEN_WIDTH
} from '../styles'

export const root = style({
  ...fonts.tooltip,
  color: colors.tooltipText.toString(),
  left: em(layouts.tooltipOffset),
  maxWidth: em(layouts.tooltipMaximumWidth),
  opacity: 0,
  pointerEvents: 'none',
  position: 'fixed',
  textAlign: 'left',
  textShadow: textShadow(colors.tooltipTextShadow.toString()),
  top: em(layouts.tooltipOffset),
  zIndex: zIndices.tooltip,
  $nest: {
    [`@media screen and (max-width: ${px(SMALL_SCREEN_WIDTH)})`]: {
      bottom: em(layouts.tooltipOffset),
      maxWidth: calc(`${viewWidth(100)} - ${em(layouts.tooltipOffset * 2)}`),
      pointerEvents: 'inherit',
      right: em(layouts.tooltipOffset)
    }
  }
})
