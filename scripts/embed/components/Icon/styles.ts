import { rem, style, url } from '../../libs'

export const root = style({
  backgroundSize: 'cover',
  height: rem(4),
  width: rem(4)
})

export const image = (src: string): string => style({
  backgroundImage: url(src)
})
