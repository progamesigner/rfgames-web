import { border, color, percent, px, rem, style } from '../../libs'

export const root = style({
  color: color('#9d9e9f').toString(),
  fontSize: rem(1),
  pointerEvents: 'none',
  position: 'fixed',
  textAlign: 'left',
  textShadow: `${px(1)} ${px(1)} ${px(1)} ${color('#151718').toString()}`,
  zIndex: 1000
})

export const container = style({
  backgroundColor: color('#151718').toString(),
  border: border({
    color: color('#151718').toString(),
    style: 'solid',
    width: px(1)
  }),
  boxShadow: `${px(1)} ${px(1)} ${px(2)} ${color('#151718').toString()}`,
  borderRadius: rem(0.125),
  padding: rem(0.25),
  width: percent(100)
})

export const title = style({
  fontSize: rem(1),
  paddingBottom: rem(0.25)
})

export const description = style({
  paddingBottom: rem(0.25)
})
