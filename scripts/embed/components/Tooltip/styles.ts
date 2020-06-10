import {
  border,
  calc,
  percent,
  px,
  rem,
  style,
  stylesheet,
  viewWidth
} from '../../libs'

import { colors, fonts, sizes, zIndices } from '../styles'

export const root = style({
  color: colors.tooltipText.toString(),
  fontFamily: fonts.text.fontFamily,
  left: rem(0.5),
  maxWidth: rem(24),
  pointerEvents: 'none',
  position: 'fixed',
  textAlign: 'left',
  textShadow: `${px(1)} ${px(1)} ${px(1)} ${colors.tooltipTextShadow.toString()}`,
  top: rem(0.5),
  zIndex: zIndices.tooltip,
  $nest: {
    [`@media screen and (max-width: ${rem(30)})`]: {
      bottom: rem(0.5),
      maxWidth: 'unset',
      pointerEvents: 'inherit',
      right: rem(0.5),
      width: calc(`${viewWidth(100)} - ${rem(2 * 0.5)}`)
    }
  }
})

export const container = style({
  backgroundColor: colors.tooltipBackground.toString(),
  border: border({
    color: colors.tooltipBorder.toString(),
    style: 'solid',
    width: px(2)
  }),
  boxShadow: `${px(1)} ${px(1)} ${px(3)} ${colors.tooltipShadow.toString()}`,
  borderRadius: rem(sizes.tooltipRadius),
  padding: rem(sizes.gap),
  width: percent(100),
  $nest: {
    '&:not(:last-child)': {
      marginBottom: rem(sizes.gap)
    }
  }
})

export const head = style({
  color: colors.tooltipTitle.toString(),
  fontSize: rem(fonts.title.fontSize),
  $nest: {
    '&:not(:last-child)': {
      marginBottom: rem(sizes.gap)
    }
  }
})

export const body = style({
  color: colors.tooltipText.toString(),
  fontSize: rem(fonts.text.fontSize),
  whiteSpace: 'pre-wrap',
  $nest: {
    '&:not(:last-child)': {
      marginBottom: rem(sizes.gap)
    }
  }
})

export const foot = style({
  color: colors.tooltipText.toString(),
  fontSize: rem(fonts.text.fontSize),
  $nest: {
    '&:not(:last-child)': {
      marginBottom: rem(sizes.gap)
    }
  }
})

export const fact = stylesheet({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    fontSize: rem(fonts.fact.fontSize)
  },
  icon: {
    flexShrink: 0,
    height: rem(sizes.factIcon),
    width: rem(sizes.factIcon)
  },
  text: {
    color: colors.tooltipFact.toString(),
    marginLeft: rem(sizes.gap)
  },
  recharge: {
    position: 'absolute',
    right: rem(sizes.gap),
    top: rem(sizes.gap)
  },
  rechargeIcon: {
    height: rem(sizes.rechargeIcon),
    marginLeft: rem(sizes.gap * 0.5),
    width: rem(sizes.rechargeIcon)
  }
})
