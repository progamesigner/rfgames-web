import {
  border,
  deg,
  px,
  quote,
  rem,
  style,
  stylesheet,
  url
} from '../../libs'

import { animations, colors, sizes } from '../styles'

const ROOT_HEIGHT = 140

const HEXAGON_WIDTH = 88
const HEXAGON_CAP_HEIGHT = HEXAGON_WIDTH / Math.sqrt(3)
const HEXAGON_BORDER_WIDTH = 2
const HEXAGON_CAP_LENGTH = HEXAGON_WIDTH * Math.SQRT1_2
const HEXAGON_SCALE_FACTOR = Math.tan(30 * Math.PI / 180)
const HEXAGON_MARGIN_LEFT = 64

const HEXAGON_POINTS2 = [
  [
    HEXAGON_MARGIN_LEFT + HEXAGON_WIDTH / 2,
    (ROOT_HEIGHT - HEXAGON_CAP_HEIGHT * 2) / 2
  ],
  [
    HEXAGON_MARGIN_LEFT + HEXAGON_WIDTH,
    (ROOT_HEIGHT - HEXAGON_CAP_HEIGHT * 2) * 0.5 + HEXAGON_CAP_HEIGHT * 0.5
  ],
  [
    HEXAGON_MARGIN_LEFT + HEXAGON_WIDTH,
    ROOT_HEIGHT * 0.5 + HEXAGON_CAP_HEIGHT - HEXAGON_CAP_HEIGHT * 0.5
  ],
  [
    HEXAGON_MARGIN_LEFT + HEXAGON_WIDTH / 2,
    ROOT_HEIGHT * 0.5 + HEXAGON_CAP_HEIGHT
  ],
  [
    HEXAGON_MARGIN_LEFT,
    ROOT_HEIGHT * 0.5 + HEXAGON_CAP_HEIGHT - HEXAGON_CAP_HEIGHT * 0.5
  ],
  [
    HEXAGON_MARGIN_LEFT,
    (ROOT_HEIGHT - HEXAGON_CAP_HEIGHT * 2) * 0.5 + HEXAGON_CAP_HEIGHT * 0.5
  ],
  [
    HEXAGON_MARGIN_LEFT + HEXAGON_WIDTH / 2,
    (ROOT_HEIGHT - HEXAGON_CAP_HEIGHT * 2) * 0.5
  ]
]

const HEXAGON_POINTS = [
  '0 0',
  ...HEXAGON_POINTS2.map(([x, y]) => `${px(x)} ${px(y)}`),
  '0 0',
  '0 100%',
  '100% 100%',
  '100% 0'
]

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
  height: px(ROOT_HEIGHT),
  maxWidth: px(650),
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
  $nest: {
    '&::after': {
      backgroundColor: 'rgb(0, 0, 0)',
      bottom: 0,
      clipPath: `polygon(${HEXAGON_POINTS.join(', ')})`,
      content: quote(''),
      display: 'block',
      left: 0,
      opacity: 0.5,
      position: 'absolute',
      right: 0,
      top: 0,
      transition: `opacity ${animations.speed} ${animations.easing}`
    }
  }
})

export const backgroundImage = (src: string): string => style({
  backgroundImage: url(src)
})

export const specialization = stylesheet({
  root: {
    marginLeft: px(HEXAGON_MARGIN_LEFT)
  },
  hexagon: {
    position: 'relative',
    width: px(HEXAGON_WIDTH),
    height: px(HEXAGON_CAP_HEIGHT),
    $nest: {
      '&, &::before, &::after': {
        border: border({
          color: 'rgba(255, 255, 255, 0.5)',
          style: 'solid',
          width: 0,
        })
      },
      '&': {
        borderLeftWidth: px(HEXAGON_BORDER_WIDTH),
        borderRightWidth: px(HEXAGON_BORDER_WIDTH)
      },
      '&::before, &::after': {
        content: quote(''),
        position: 'absolute',
        width: px(HEXAGON_CAP_LENGTH),
        height: px(HEXAGON_CAP_LENGTH),
        transform: `scaleY(${HEXAGON_SCALE_FACTOR}) rotate(${deg(-45)})`,
        left: px((HEXAGON_WIDTH - HEXAGON_CAP_LENGTH) / 2 - HEXAGON_BORDER_WIDTH)
      },
      '&::before': {
        borderTopWidth: px(HEXAGON_BORDER_WIDTH),
        borderRightWidth: px(HEXAGON_BORDER_WIDTH),
        top: px(-HEXAGON_CAP_LENGTH / 2)
      },
      '&::after': {
        borderBottomWidth: px(HEXAGON_BORDER_WIDTH),
        borderLeftWidth: px(HEXAGON_BORDER_WIDTH),
        bottom: px(-HEXAGON_CAP_LENGTH / 2)
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
    justifyContent: 'space-around',
    maxWidth: px(425),
    padding: `${rem(sizes.gap)} 0`,
    position: 'relative'
  },
  minor: {
  },
  minorIcon: {
    clipPath: 'polygon(50% 0, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)'
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
