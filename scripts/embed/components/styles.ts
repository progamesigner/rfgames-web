import { style, rem } from '../libs'

export const root = style({
  display: 'flex'
})

export const name = style({
  alignItems: 'center',
  display: 'flex'
})

export const icon = style({
})

export const inline = style({
  alignItems: 'baseline',
  display: 'inline-flex',
  $nest: {
    '.gw2-embed-icon': {
      display: 'inline',
      height: rem(1.25),
      width: rem(1.25)
    }
  }
})
