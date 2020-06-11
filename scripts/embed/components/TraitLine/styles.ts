import {
  border,
  deg,
  em,
  keyframes,
  percent,
  polygon,
  px,
  quote,
  rem,
  style,
  stylesheet,
  url
} from '../../libs'

import { animations, colors, images, layouts, sizes, zIndices } from '../styles'

const SQRT2 = Math.sqrt(2)
const SQRT3 = Math.sqrt(3)
const SQRT1_2 = 1 / SQRT2
const SQRT1_3 = 1 / SQRT3

const connectorAngle = 55
const hexagonApothem = 36
const hexagonBorderWidth = 2
const traitlineHeight = 140

const hexagonCapHeight = 2 * hexagonApothem * SQRT1_2
const hexagonDiameter = hexagonApothem * 2 * SQRT1_3

const connectorScaleFactor = 1 / Math.cos(connectorAngle * Math.PI / 180)
const hexagonScaleFactor = Math.tan(30 * Math.PI / 180)

const traitHexagonPoints = [
  [50, 0],
  [93, 25],
  [93, 75],
  [50, 100],
  [7, 75],
  [7, 25]
].map(([x, y]) => `${percent(x)} ${percent(y)}`)

const vividness = keyframes({
  [`${percent(0)}`]: {
    backgroundPositionX: 0,
    opacity: 1
  },
  [`${percent(50)}`]: {
    opacity: 0.75
  },
  [`${percent(100)}`]: {
    backgroundPositionX: 100,
    opacity: 0.95
  }
})

function calculateHexagonPoints(
  a: number, // hexagon apothem (px)
  d: number, // hexagon diameter (px)
  x: number, // margin left of hexagon container (px)
  h: number // container height (px)
): Array<string> {
  const y = (h - d * 2) / 2

  return [
    [a, 0],
    [a * 2.0, d * 0.5],
    [a * 2.0, d * 1.5],
    [a, d * 2.0],
    [0, d * 1.5],
    [0, d * 0.5],
    [a, 0]
  ].map(([dx, dy]) => `${px(x + dx)} ${px(y + dy)}`)
}

export const root = style({
  alignItems: 'center',
  backgroundColor: colors.iconBackground.toString(),
  border: border({
    color: colors.iconBorder.toString(),
    style: 'solid',
    width: px(1)
  }),
  boxShadow: `${px(1)} ${px(1)} ${px(3)} ${colors.traitlineShadow.toString()}`,
  display: 'flex',
  height: px(traitlineHeight),
  maxWidth: px(650),
  position: 'relative',
  $nest: {
    '&:hover': {
      $nest: {
        '> ::after': {
          opacity: 0.15
        }
      }
    }
  }
})

export const elite = style()

export const background = style({
  backgroundPosition: 'bottom left',
  backgroundRepeat: 'no-repeat',
  bottom: 0,
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: zIndices.traitlineBackground,
  $nest: {
    '&::after': {
      backgroundColor: 'rgb(0, 0, 0)',
      bottom: 0,
      clipPath: polygon([
        '0 0',
        ...calculateHexagonPoints(hexagonApothem,  hexagonDiameter, 8, traitlineHeight),
        '0 0',
        `0 ${percent(100)}`,
        `${percent(100)} ${percent(100)}`,
        `${percent(100)} 0`
      ]),
      content: quote(''),
      display: 'block',
      left: 0,
      opacity: 0.5,
      position: 'absolute',
      right: 0,
      top: 0,
      transition: `opacity ${animations.speed} ${animations.easing}`,
      zIndex: zIndices.traitlineOverlay
    },
    [`@media screen and (min-width: ${px(640)})`]: {
      $nest: {
        '&::after': {
          clipPath: polygon([
            '0 0',
            ...calculateHexagonPoints(hexagonApothem,  hexagonDiameter, 24, traitlineHeight),
            '0 0',
            `0 ${percent(100)}`,
            `${percent(100)} ${percent(100)}`,
            `${percent(100)} 0`
          ])
        }
      }
    },
    [`@media screen and (min-width: ${px(640)})`]: {
      $nest: {
        '&::after': {
          clipPath: polygon([
            '0 0',
            ...calculateHexagonPoints(hexagonApothem,  hexagonDiameter, 64, traitlineHeight),
            '0 0',
            `0 ${percent(100)}`,
            `${percent(100)} ${percent(100)}`,
            `${percent(100)} 0`
          ])
        }
      }
    }
  }
})

export const backgroundImage = (src: string): string => style({
  backgroundImage: url(src)
})

export const specialization = stylesheet({
  root: {
    marginLeft: px(8),
    $nest: {
      [`@media screen and (min-width: ${px(480)})`]: {
        marginLeft: px(24)
      },
      [`@media screen and (min-width: ${px(640)})`]: {
        marginLeft: px(64)
      }
    }
  },
  hexagon: {
    position: 'relative',
    width: px(2 * hexagonApothem),
    height: px(hexagonDiameter),
    zIndex: zIndices.traitlineHexagon,
    $nest: {
      '&, &::before, &::after': {
        border: border({
          color: 'rgba(255, 255, 255, 0.5)',
          style: 'solid',
          width: 0,
        })
      },
      '&': {
        borderLeftWidth: px(hexagonBorderWidth),
        borderRightWidth: px(hexagonBorderWidth)
      },
      '&::before, &::after': {
        content: quote(''),
        position: 'absolute',
        width: px(hexagonCapHeight),
        height: px(hexagonCapHeight),
        transform: `scaleY(${hexagonScaleFactor}) rotate(${deg(-45)})`,
        left: px((2 * hexagonApothem - hexagonCapHeight) / 2 - hexagonBorderWidth),
        zIndex: zIndices.traitlineHexagon
      },
      '&::before': {
        borderTopWidth: px(hexagonBorderWidth),
        borderRightWidth: px(hexagonBorderWidth),
        top: px(-hexagonCapHeight / 2)
      },
      '&::after': {
        borderBottomWidth: px(hexagonBorderWidth),
        borderLeftWidth: px(hexagonBorderWidth),
        bottom: px(-hexagonCapHeight / 2)
      }
    }
  }
})

export const traits = stylesheet({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
    marginLeft: em(layouts.gap * 2),
    maxWidth: px(425),
    padding: `${em(layouts.gap)} ${em(layouts.gap * 2)}`,
    position: 'relative',
    zIndex: zIndices.traitlineTrait,
    $nest: {
      [`@media screen and (min-width: ${px(720)})`]: {
        marginLeft: em(layouts.gap * 4),
      }
    }
  },
  minor: {
  },
  minorIcon: {
    clipPath: polygon(traitHexagonPoints)
  },
  major: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  majorIcon: {
    clipPath: `inset(${px(2)} ${px(2)} ${px(2)} ${px(2)})`
  },
  inactive: {
    opacity: 0.5,
    transition: `opacity ${animations.speed} ${animations.easing}`,
    $nest: {
      '&:hover': {
        opacity: 0.75
      }
    }
  }
})

export const connector = stylesheet({
  root: {
    position: 'relative',
    width: 0,
    zIndex: zIndices.traitlineConnector,
    $nest: {
      '&::after': {
        animation: vividness,
        animationDuration: '3s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
        backgroundColor: colors.traitlineConnector.toString(),
        backgroundImage: images.traitlineConnector.toString(),
        backgroundRepeat: 'repeat-x',
        borderRadius: rem(0.0625),
        content: quote(''),
        display: 'block',
        height: rem(0.25),
        left: rem(-0.75),
        position: 'absolute',
        width: rem(1.5),
        zIndex: zIndices.traitlineConnector
      },
      [`@media screen and (max-width: ${px(480)})`]: {
        display: 'none'
      }
    }
  },
  toTop: {
    $nest: {
      '&::after': {
        top: rem(-sizes.traitIcon / 2),
        transform: `rotate(${deg(-connectorAngle)}) scaleX(${connectorScaleFactor})`
      }
    }
  },
  toMiddle: {
  },
  toBottom: {
    $nest: {
      '&::after': {
        bottom: rem(-sizes.traitIcon / 2),
        transform: `rotate(${deg(connectorAngle)}) scaleX(${connectorScaleFactor})`
      }
    }
  },
  fromTop: {
    $nest: {
      '&::after': {
        top: rem(-sizes.traitIcon / 2),
        transform: `rotate(${deg(connectorAngle)}) scaleX(${connectorScaleFactor})`
      }
    }
  },
  fromMiddle: {
  },
  fromBottom: {
    $nest: {
      '&::after': {
        bottom: rem(-sizes.traitIcon / 2),
        transform: `rotate(${deg(-connectorAngle)}) scaleX(${connectorScaleFactor})`
      }
    }
  },
  disabled: {
    $nest: {
      '&::after': {
        display: 'none'
      }
    }
  }
})
