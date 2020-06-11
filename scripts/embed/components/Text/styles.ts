import { rem, style } from '../../libs'

import { sizes } from '../styles'

export const root = style({
  alignItems: 'center',
  display: 'inline-flex',
  $nest: {
    '&:not(:first-child)': {
      marginLeft: rem(sizes.gap)
    }
  }
})
