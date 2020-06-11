import {
  border,
  deg,
  keyframes,
  percent,
  rem,
  rotate,
  style
} from '../../libs'

import { colors, sizes } from '../styles'

const spin = keyframes({
  from: {
    transform: rotate(deg(0))
  },
  to: {
    transform: rotate(deg(360))
  }
})

export const icon = style()

export const iconSize = style({
  height: rem(sizes.emptyIcon),
  width: rem(sizes.emptyIcon)
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
  bottom: rem(2 * sizes.gap),
  display: 'block',
  left: rem(2 * sizes.gap),
  position: 'absolute',
  right: rem(2 * sizes.gap),
  top: rem(2 * sizes.gap)
})
