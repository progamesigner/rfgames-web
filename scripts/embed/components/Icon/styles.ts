import { border, color, percent, px, rem, style, url } from '../../libs'

export const root = style({
  backgroundColor: color('#151718').toString(),
  backgroundImage: `radial-gradient(circle, ${color('#606468').toString()}, ${color('#333333').toString()})`,
  border: border({
    color: color('#151718').darken(percent(25)).toString(),
    style: 'solid',
    width: px(1)
  }),
  display: 'inline-block',
  height: rem(4),
  position: 'relative',
  width: rem(4)
})

export const icon = style({
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  bottom: 0,
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0
})

export const inline = style({
  backgroundColor: 'transparent',
  backgroundImage: 'none',
  border: 'none',
  verticalAlign: 'middle'
})

export const image = (src: string): string => style({
  backgroundImage: url(src)
})

export const applyCount = style({
  bottom: rem(0.25),
  color: color('#fff4cf').toString(),
  fontSize: rem(0.75),
  margin: 0, // @note: force reset style for compatibility
  padding: 0, // @note: force reset style for compatibility
  pointerEvents: 'none',
  position: 'absolute',
  right: rem(0.25),
  textShadow: `0 0 ${px(5)} ${color('#151718').toString()}`,
  zIndex: 100
})
