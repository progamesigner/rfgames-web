import { colors, keyframes, px, style } from '../styles'

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
  borderRadius: px(2),
  color: colors.loaderStrip.toString(),
  opacity: 0.5,
  textShadow: 'none'
})
