import { border, color, percent, px, rem, style, stylesheet } from '../../libs'

export const root = style({
  color: color('#9d9e9f').toString(),
  fontSize: rem(1),
  pointerEvents: 'none',
  position: 'fixed',
  textAlign: 'left',
  maxWidth: rem(20),
  textShadow: `${px(1)} ${px(1)} ${px(1)} ${color('#151718').toString()}`,
  zIndex: 1000,
  $nest: {
    '& > :not(:last-child)': {
      marginBottom: rem(0.25)
    }
  }
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

export const head = style({
  color: color('#ffc90e').toString(),
  fontSize: rem(1),
  paddingBottom: rem(0.25)
})

export const body = style({
  paddingBottom: rem(0.25),
  whiteSpace: 'pre-wrap'
})

export const foot = style({
  color: color('#eebb66').toString(),
  fontSize: rem(1)
})

export const fact = stylesheet({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    fontSize: rem(0.85)
  },
  icon: {
    flexShrink: 0,
    height: rem(2),
    width: rem(2)
  },
  text: {
    color: color('rgba(255, 255, 255, 0.7)').toString(),
    marginLeft: rem(0.25)
  },
  recharge: {
    position: 'absolute',
    right: rem(0.25),
    top: rem(0.25)
  },
  rechargeIcon: {
    height: rem(1.125),
    marginLeft: rem(0.125),
    width: rem(1.125)
  }
})