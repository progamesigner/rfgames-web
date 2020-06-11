import {
  animations,
  border,
  boxShadow,
  colors,
  deg,
  em,
  images,
  keyframes,
  layouts,
  percent,
  polygon,
  px,
  quote,
  sizes,
  style,
  stylesheet,
  url,
  zIndices
} from '../styles'

const SQRT2 = Math.sqrt(2)
const SQRT3 = Math.sqrt(3)
const SQRT1_2 = 1 / SQRT2
const SQRT1_3 = 1 / SQRT3

const connectorAngle = 55
const hexagonApothem = 2.25
const hexagonBorderWidth = 0.125
const majorTraitInset = 0.125
const traitlineMaximumWidth = 40
const traitlineHeight = 8.75

const hexagonCapHeight = 2 * hexagonApothem * SQRT1_2
const hexagonDiameter = hexagonApothem * 2 * SQRT1_3

const connectorScaleFactor = 1 / Math.cos(connectorAngle * Math.PI / 180)
const hexagonScaleFactor = Math.tan(30 * Math.PI / 180)

const hexagonMarginLeftSmallScreen = 0.5
const hexagonMarginLeftMediumScreen = 1.5
const hexagonMarginLeftLargeScreen = 4

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
  a: number, // hexagon apothem
  d: number, // hexagon diameter
  x: number, // margin left of hexagon container
  h: number // container height
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
  ].map(([dx, dy]) => `${em(x + dx)} ${em(y + dy)}`)
}

export const root = style({
  alignItems: 'center',
  backgroundColor: colors.iconBackground.toString(),
  border: border({
    color: colors.iconBorder.toString(),
    style: 'solid',
    width: em(layouts.iconBorder)
  }),
  boxShadow: boxShadow(colors.traitlineShadow.toString()),
  display: 'flex',
  height: em(traitlineHeight),
  maxWidth: em(traitlineMaximumWidth),
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
        `${percent(0)} ${percent(0)}`,
        ...calculateHexagonPoints(
          hexagonApothem,
          hexagonDiameter,
          hexagonMarginLeftSmallScreen,
          traitlineHeight
        ),
        `${percent(0)} ${percent(0)}`,
        `${percent(0)} ${percent(100)}`,
        `${percent(100)} ${percent(100)}`,
        `${percent(100)} ${percent(0)}`
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
            `${percent(0)} ${percent(0)}`,
            ...calculateHexagonPoints(
              hexagonApothem,
              hexagonDiameter,
              hexagonMarginLeftMediumScreen,
              traitlineHeight
            ),
            `${percent(0)} ${percent(0)}`,
            `${percent(0)} ${percent(100)}`,
            `${percent(100)} ${percent(100)}`,
            `${percent(100)} ${percent(0)}`
          ])
        }
      }
    },
    [`@media screen and (min-width: ${px(640)})`]: {
      $nest: {
        '&::after': {
          clipPath: polygon([
            `${percent(0)} ${percent(0)}`,
            ...calculateHexagonPoints(
              hexagonApothem,
              hexagonDiameter,
              hexagonMarginLeftLargeScreen,
              traitlineHeight
            ),
            `${percent(0)} ${percent(0)}`,
            `${percent(0)} ${percent(100)}`,
            `${percent(100)} ${percent(100)}`,
            `${percent(100)} ${percent(0)}`
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
    marginLeft: em(hexagonMarginLeftSmallScreen),
    $nest: {
      [`@media screen and (min-width: ${px(480)})`]: {
        marginLeft: em(hexagonMarginLeftMediumScreen)
      },
      [`@media screen and (min-width: ${px(640)})`]: {
        marginLeft: em(hexagonMarginLeftLargeScreen)
      }
    }
  },
  hexagon: {
    position: 'relative',
    width: em(hexagonApothem * 2),
    height: em(hexagonDiameter),
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
        borderLeftWidth: em(hexagonBorderWidth),
        borderRightWidth: em(hexagonBorderWidth)
      },
      '&::before, &::after': {
        content: quote(''),
        position: 'absolute',
        width: em(hexagonCapHeight),
        height: em(hexagonCapHeight),
        transform: `scaleY(${hexagonScaleFactor}) rotate(${deg(-45)})`,
        left: em((hexagonApothem * 2 - hexagonCapHeight) / 2 - hexagonBorderWidth),
        zIndex: zIndices.traitlineHexagon
      },
      '&::before': {
        borderTopWidth: em(hexagonBorderWidth),
        borderRightWidth: em(hexagonBorderWidth),
        top: em(-hexagonCapHeight / 2)
      },
      '&::after': {
        borderBottomWidth: em(hexagonBorderWidth),
        borderLeftWidth: em(hexagonBorderWidth),
        bottom: em(-hexagonCapHeight / 2)
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
    clipPath: `inset(${em(majorTraitInset)} ${em(majorTraitInset)} ${em(majorTraitInset)} ${em(majorTraitInset)})`
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
        borderRadius: em(layouts.traitlineConnectorRadius),
        content: quote(''),
        display: 'block',
        height: em(layouts.traitlineConnectorHeight),
        left: em(-layouts.traitlineConnectorWidth / 2),
        position: 'absolute',
        width: em(layouts.traitlineConnectorWidth),
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
        top: em(-sizes.traitIcon / 2),
        transform: `rotate(${deg(-connectorAngle)}) scaleX(${connectorScaleFactor})`
      }
    }
  },
  toMiddle: {
  },
  toBottom: {
    $nest: {
      '&::after': {
        bottom: em(-sizes.traitIcon / 2),
        transform: `rotate(${deg(connectorAngle)}) scaleX(${connectorScaleFactor})`
      }
    }
  },
  fromTop: {
    $nest: {
      '&::after': {
        top: em(-sizes.traitIcon / 2),
        transform: `rotate(${deg(connectorAngle)}) scaleX(${connectorScaleFactor})`
      }
    }
  },
  fromMiddle: {
  },
  fromBottom: {
    $nest: {
      '&::after': {
        bottom: em(-sizes.traitIcon / 2),
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
