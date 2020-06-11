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

import { animations, colors, fonts, sizes, zIndices } from '../styles'

export const root = style({
  color: colors.tooltipText.toString(),
  fontFamily: fonts.text.fontFamily,
  left: rem(0.5),
  maxWidth: px(360),
  pointerEvents: 'none',
  position: 'fixed',
  textAlign: 'left',
  textShadow: `${px(1)} ${px(1)} ${px(1)} ${colors.tooltipTextShadow.toString()}`,
  top: rem(0.5),
  zIndex: zIndices.tooltip,
  transition: `opacity ${animations.speed} ${animations.easing}`,
  $nest: {
    [`@media screen and (max-width: ${px(480)})`]: {
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
    flexShrink: 0
  },
  iconSize: {
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


// // ============================================================================
// // * Menomonia
// // ----------------------------------------------------------------------------
// //   These fonts are used in showing Guild Wars 2 tooltips
// // ============================================================================

// @font-face {
//   font-family: 'Menomonia';
//   src: url('../../../assets/fonts/menomonia.eot');
//   src: url('../../../assets/fonts/menomonia.eot?#iefix') format('embedded-opentype'),
//        url('../../../assets/fonts/menomonia.woff') format('woff'),
//        url('../../../assets/fonts/menomonia.ttf') format('truetype'),
//        url('../../../assets/fonts/menomonia.svg#MenomoniaRegular') format('svg');
//   font-weight: normal;
//   font-style: normal;
// }

// @font-face {
//   font-family: "Menomonia Italic";
//   src: url('../../../assets/fonts/menomonia-italic.eot');
//   src: url('../../../assets/fonts/menomonia-italic.eot?#iefix') format('embedded-opentype'),
//        url('../../../assets/fonts/menomonia-italic.woff') format('woff'),
//        url('../../../assets/fonts/menomonia-italic.ttf') format('truetype'),
//        url('../../../assets/fonts/menomonia-italic.svg#MenomoniaRegular') format('svg');
//   font-weight: normal;
//   font-style: italic;
// }


// @import 'menomonia';
// @import url('https://fonts.googleapis.com/css?family=Open+Sans:400');
