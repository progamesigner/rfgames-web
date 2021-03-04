import {
  border,
  colors,
  em,
  layouts,
  sizes,
  style,
  stylesheet
} from '../../styles'

export { flavors } from '../../styles'

export const attribute = style()

export const bonus = stylesheet({
  active: {
    color: colors.bonusActive.toString()
  },
  inactive: {
    color: colors.bonusInactive.toString()
  }
})

export const coin = style({
  marginLeft: em(layouts.gap * 2)
})

export const consumable = style({
  alignItems: 'flex-start',
  color: colors.consumable.toString(),
  display: 'flex'
})

export const effect = stylesheet({
  icon: {
    flexGrow: 0,
    flexShrink: 0,
    marginRight: em(layouts.gap)
  },
  iconSize: {
    height: em(sizes.tooltipEffectIcon),
    width: em(sizes.tooltipEffectIcon)
  }
})

export const head = style({
  alignItems: 'center',
  display: 'flex'
})

export const icon = style({
  border: border({
    style: 'solid',
    width: em(layouts.iconBorder)
  }),
  borderColor: colors.tooltipItemBorder,
  flexGrow: 0,
  flexShrink: 0,
  marginRight: em(layouts.gap)
})

export const iconSize = style({
  height: em(sizes.tooltipItemIcon),
  width: em(sizes.tooltipItemIcon)
})

export const name = style()

export const spacing = style({
  display: 'block',
  marginTop: em(layouts.gap * 2)
})

export const stat = stylesheet({
  attribute: {
    color: colors.statAttribute.toString()
  },
  buff: {
    color: colors.statBuff.toString()
  },
  item: {
    color: colors.statItem.toString()
  }
})

export const rarities = stylesheet({
  junk: {
    color: colors.rarityJunk.toString()
  },
  basic: {
    color: colors.rarityBasic.toString()
  },
  fine: {
    color: colors.rarityFine.toString()
  },
  masterwork: {
    color: colors.rarityMasterwork.toString()
  },
  rare: {
    color: colors.rarityRare.toString()
  },
  exotic: {
    color: colors.rarityExotic.toString()
  },
  ascended: {
    color: colors.rarityAscended.toString()
  },
  legendary: {
    color: colors.rarityLegendary.toString()
  }
})
