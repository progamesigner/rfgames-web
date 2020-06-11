import {
  border,
  deg,
  keyframes,
  percent,
  px,
  rem,
  rotate,
  style,
  stylesheet
} from '../../libs'

import { colors, layouts, sizes } from '../styles'

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
    height: rem(sizes.emptyIcon),
    width: rem(sizes.emptyIcon)
  },
  inline: {
    height: rem(sizes.emptyIcon),
    width: rem(sizes.emptyIcon)
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
    width: rem(0.25)
  }),
  borderRadius: percent(50),
  borderTopColor: 'currentColor',
  bottom: px(layouts.gap * 2),
  display: 'block',
  left: px(layouts.gap * 2),
  position: 'absolute',
  right: px(layouts.gap * 2),
  top: px(layouts.gap * 2)
})
