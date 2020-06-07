import {
  border,
  color,
  iconApplyCountFontSize,
  iconApplyCountPadding,
  iconMediumSize,
  percent,
  px,
  rem,
  style,
  url
} from '../styles'

export const root = style({
  alignItems: 'center',
  backgroundColor: color('#151718').toString(),
  backgroundImage: `radial-gradient(circle, ${color('#606468').toString()}, ${color('#333333').toString()})`,
  border: border({
    color: color('#151718').darken(percent(25)).toString(),
    style: 'solid',
    width: px(1)
  }),
  display: 'inline-flex',
  height: rem(iconMediumSize),
  position: 'relative',
  verticalAlign: 'middle',
  width: rem(iconMediumSize)
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
  border: 'none'
})

export const image = (src: string): string => style({
  backgroundImage: url(src)
})

export const applyCount = style({
  bottom: rem(iconApplyCountPadding),
  color: color('#fff4cf').toString(),
  fontSize: rem(iconApplyCountFontSize),
  margin: 0, // @note: force reset style for compatibility
  padding: 0, // @note: force reset style for compatibility
  pointerEvents: 'none',
  position: 'absolute',
  right: rem(iconApplyCountPadding),
  textShadow: `0 0 ${rem(iconApplyCountPadding)} ${color('#151718').toString()}`,
  zIndex: 100
})
