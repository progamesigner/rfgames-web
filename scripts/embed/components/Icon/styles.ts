import {
  border,
  colors,
  em,
  fonts,
  images,
  layouts,
  style,
  textShadow,
  url,
  zIndices
} from '../styles'

export const root = style({
  display: 'inline-block',
  position: 'relative',
  verticalAlign: 'middle',
  $nest: {
    '& > a[href]': {
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: zIndices.iconLink
    }
  }
})

export const icon = style({
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  bottom: 0,
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: zIndices.iconImage
})

export const image = (src: string): string => style({
  backgroundImage: url(src)
})

export const placeholder = style({
  backgroundColor: colors.iconBackground.toString(),
  backgroundImage: images.iconBackground,
  border: border({
    color: colors.iconBorder.toString(),
    style: 'solid',
    width: em(layouts.iconBorder)
  })
})

export const applyCount = style({
  ...fonts.iconApplyCount,
  bottom: em(layouts.applyCount),
  color: colors.applyCount.toString(),
  margin: 0, // @note: force reset style for compatibility
  padding: 0, // @note: force reset style for compatibility
  pointerEvents: 'none',
  position: 'absolute',
  textShadow: textShadow(colors.applyCountShadow.toString()),
  right: em(layouts.applyCount),
  zIndex: zIndices.applyCount
})
