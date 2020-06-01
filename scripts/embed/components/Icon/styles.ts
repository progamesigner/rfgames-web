import { rem, style, url } from '../../libs'

export const iconStyle = style({
  backgroundSize: 'cover',
  height: rem(4),
  width: rem(4)
})

export const iconImageStyle = (src: string): string => style({
  backgroundImage: url(src)
})
