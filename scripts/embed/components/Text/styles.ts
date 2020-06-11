import { em, style } from '../../libs'

import { layouts } from '../styles'

export const root = style({
  alignItems: 'center',
  display: 'inline-flex',
  $nest: {
    '&:not(:first-child)': {
      marginLeft: em(layouts.gap)
    }
  }
})
