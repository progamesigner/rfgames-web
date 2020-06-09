import {
  border,
  colors,
  fonts,
  images,
  px,
  rem,
  sizes,
  style,
  url,
  zIndices,
} from '../styles'

export const root = style({
  display: 'inline-block',
  position: 'relative',
  verticalAlign: 'middle'
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

export const block = style({
  backgroundColor: colors.iconBackground.toString(),
  backgroundImage: images.iconBackground,
  border: border({
    color: colors.iconBorder.toString(),
    style: 'solid',
    width: px(1)
  })
})

export const inline = style()

export const image = (src: string): string => style({
  backgroundImage: url(src)
})

export const applyCount = style({
  bottom: rem(sizes.applyCountPadding),
  color: colors.applyCount.toString(),
  fontSize: rem(fonts.applyCount.fontSize),
  margin: 0, // @note: force reset style for compatibility
  padding: 0, // @note: force reset style for compatibility
  pointerEvents: 'none',
  position: 'absolute',
  right: rem(sizes.applyCountPadding),
  zIndex: zIndices.applyCount
})
