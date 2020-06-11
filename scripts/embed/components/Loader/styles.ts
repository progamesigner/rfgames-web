import {
  border,
  colors,
  deg,
  em,
  keyframes,
  layouts,
  percent,
  rotate,
  sizes,
  style,
  stylesheet,
  zIndices
} from '../styles'

const spin = keyframes({
  from: {
    transform: rotate(deg(0))
  },
  to: {
    transform: rotate(deg(360))
  }
})

export const icon = stylesheet({
  root:{
  },
  block: {
    height: em(sizes.emptyIcon),
    width: em(sizes.emptyIcon)
  },
  inline: {
    height: em(sizes.emptyIcon),
    width: em(sizes.emptyIcon)
  }
})

export const text = style()

export const loader = style({
  animationDuration: '0.7s',
  animationIterationCount: 'infinite',
  animationName: spin,
  animationTimingFunction: 'linear',
  border: border({
    color: colors.loaderBorder.toString(),
    style: 'solid',
    width: em(layouts.loaderWidth)
  }),
  borderRadius: percent(50),
  borderTopColor: 'currentColor',
  bottom: em(layouts.gap * 2),
  display: 'block',
  left: em(layouts.gap * 2),
  position: 'absolute',
  right: em(layouts.gap * 2),
  top: em(layouts.gap * 2),
  zIndex: zIndices.loader
})
