import { colors, em, layouts, keyframes, style } from '../styles'

const loading = keyframes({
  from: {
    opacity: 0.5
  },
  to: {
    opacity: 0.75
  }
})

export const root = style({
  animationDirection: 'alternate',
  animationDuration: '1s',
  animationIterationCount: 'infinite',
  animationName: loading,
  backgroundColor: colors.loaderStrip.toString(),
  borderRadius: em(layouts.loadingStripRadius),
  color: colors.loaderStrip.toString(),
  height: em(1),
  opacity: 0.5,
  textShadow: 'none'
})
