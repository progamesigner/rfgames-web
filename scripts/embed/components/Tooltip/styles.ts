import {
  border,
  calc,
  em,
  percent,
  px,
  style,
  stylesheet,
  viewWidth
} from '../../libs'

import { animations, colors, fonts, sizes, zIndices } from '../styles'

export const root = style({
  color: colors.tooltipText.toString(),
  fontFamily: fonts.text.fontFamily,
  fontSize: px(fonts.text.fontSize),
  left: px(sizes.tooltipOffset),
  maxWidth: px(360),
  opacity: 0,
  pointerEvents: 'none',
  position: 'fixed',
  textAlign: 'left',
  textShadow: `${px(1)} ${px(1)} ${px(1)} ${colors.tooltipTextShadow.toString()}`,
  top: px(sizes.tooltipOffset),
  transition: `opacity ${animations.speed} ${animations.easing}`,
  zIndex: zIndices.tooltip,
  $nest: {
    [`@media screen and (max-width: ${px(480)})`]: {
      bottom: px(sizes.tooltipOffset),
      maxWidth: 'unset',
      pointerEvents: 'inherit',
      right: px(sizes.tooltipOffset),
      width: calc(`${viewWidth(100)} - ${px(sizes.tooltipOffset * 2)}`)
    }
  }
})

export const container = style({
  backgroundColor: colors.tooltipBackground.toString(),
  border: border({
    color: colors.tooltipBorder.toString(),
    style: 'solid',
    width: px(sizes.tooltipBorder)
  }),
  boxShadow: `${px(1)} ${px(1)} ${px(3)} ${colors.tooltipShadow.toString()}`,
  borderRadius: em(sizes.tooltipRadius),
  padding: em(sizes.gap),
  width: percent(100),
  $nest: {
    '&:not(:last-child)': {
      marginBottom: em(sizes.gap)
    }
  }
})

export const head = style({
  color: colors.tooltipTitle.toString(),
  fontFamily: fonts.title.fontFamily,
  fontSize: px(fonts.title.fontSize),
  $nest: {
    '&:not(:last-child)': {
      marginBottom: em(sizes.gap)
    }
  }
})

export const body = style({
  color: colors.tooltipText.toString(),
  whiteSpace: 'pre-wrap',
  $nest: {
    '&:not(:last-child)': {
      marginBottom: em(sizes.gap)
    }
  }
})

export const foot = style({
  color: colors.tooltipText.toString(),
  $nest: {
    '&:not(:last-child)': {
      marginBottom: em(sizes.gap)
    }
  }
})

export const fact = stylesheet({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    fontFamily: fonts.fact.fontFamily,
    fontSize: px(fonts.fact.fontSize)
  },
  icon: {
    flexShrink: 0
  },
  iconSize: {
    height: em(sizes.factIcon),
    width: em(sizes.factIcon)
  },
  text: {
    color: colors.tooltipFact.toString(),
    marginLeft: em(sizes.gap)
  },
  recharge: {
    position: 'absolute',
    right: em(sizes.gap),
    top: em(sizes.gap)
  },
  rechargeIcon: {
    height: em(sizes.rechargeIcon),
    marginLeft: em(sizes.gap * 0.5),
    width: em(sizes.rechargeIcon)
  }
})
