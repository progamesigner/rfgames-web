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

import { animations, colors, fonts, layouts, sizes, zIndices } from '../styles'

export const root = style({
  ...fonts.tooltip,
  color: colors.tooltipText.toString(),
  left: em(layouts.tooltipOffset),
  maxWidth: px(360),
  opacity: 0,
  pointerEvents: 'none',
  position: 'fixed',
  textAlign: 'left',
  textShadow: `${px(1)} ${px(1)} ${px(1)} ${colors.tooltipTextShadow.toString()}`,
  top: em(layouts.tooltipOffset),
  transition: `opacity ${animations.speed} ${animations.easing}`,
  zIndex: zIndices.tooltip,
  $nest: {
    [`@media screen and (max-width: ${px(480)})`]: {
      bottom: em(layouts.tooltipOffset),
      maxWidth: calc(`${viewWidth(100)} - ${em(layouts.tooltipOffset * 2)}`),
      pointerEvents: 'inherit',
      right: em(layouts.tooltipOffset)
    }
  }
})

export const container = style({
  backgroundColor: colors.tooltipBackground.toString(),
  border: border({
    color: colors.tooltipBorder.toString(),
    style: 'solid',
    width: em(layouts.tooltipBorder)
  }),
  boxShadow: `${px(1)} ${px(1)} ${px(3)} ${colors.tooltipShadow.toString()}`,
  borderRadius: em(layouts.tooltipRadius),
  padding: em(layouts.gap),
  width: percent(100),
  $nest: {
    '&:not(:last-child)': {
      marginBottom: em(layouts.gap)
    }
  }
})

export const head = style({
  ...fonts.tooltipHead,
  color: colors.tooltipTitle.toString(),
  $nest: {
    '&:not(:last-child)': {
      marginBottom: em(layouts.gap)
    }
  }
})

export const body = style({
  ...fonts.tooltipBody,
  color: colors.tooltipText.toString(),
  whiteSpace: 'pre-wrap',
  $nest: {
    '&:not(:last-child)': {
      marginBottom: em(layouts.gap)
    }
  }
})

export const foot = style({
  ...fonts.tooltipFoot,
  color: colors.tooltipText.toString(),
  $nest: {
    '&:not(:last-child)': {
      marginBottom: em(layouts.gap)
    }
  }
})

export const fact = stylesheet({
  root: {
    ...fonts.fact,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
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
    marginLeft: em(layouts.gap)
  },
  recharge: {
    position: 'absolute',
    right: em(layouts.rechargeOffset),
    top: em(layouts.rechargeOffset),
    zIndex: zIndices.rechargeIcon
  },
  rechargeIcon: {
    height: em(sizes.tooltipRechargeIcon),
    marginLeft: em(layouts.gap),
    width: em(sizes.tooltipRechargeIcon)
  }
})
