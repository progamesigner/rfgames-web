import {
  border,
  colors,
  deg,
  em,
  keyframes,
  layouts,
  percent,
  rotate,
  sizes,
  style,
  stylesheet,
  zIndices
} from '../styles'

const spin = keyframes({
  from: {
    transform: rotate(deg(0))
  },
  to: {
    transform: rotate(deg(360))
  }
})

export const icon = stylesheet({
  root:{
  },
  inline: {
    height: em(sizes.inlineIcon),
    width: em(sizes.inlineIcon)
  },
  item: {
    height: em(sizes.itemIcon),
    width: em(sizes.itemIcon)
  },
  profession: {
    height: em(sizes.professionIcon),
    width: em(sizes.professionIcon)
  },
  skill: {
    height: em(sizes.skillIcon),
    width: em(sizes.skillIcon)
  },
  specialization: {
    height: em(sizes.specializationIcon),
    width: em(sizes.specializationIcon)
  },
  trait: {
    height: em(sizes.traitIcon),
    width: em(sizes.traitIcon)
  }
})

export const text = style()

export const loader = style({
  animationDuration: '0.7s',
  animationIterationCount: 'infinite',
  animationName: spin,
  animationTimingFunction: 'linear',
  border: border({
    color: colors.loaderBorder.toString(),
    style: 'solid',
    width: em(layouts.loaderWidth)
  }),
  borderRadius: percent(50),
  borderTopColor: 'currentColor',
  bottom: em(layouts.gap),
  display: 'block',
  left: em(layouts.gap),
  position: 'absolute',
  right: em(layouts.gap),
  top: em(layouts.gap),
  zIndex: zIndices.loader
})
