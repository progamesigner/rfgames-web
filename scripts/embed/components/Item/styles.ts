import { border, px, rem, style, stylesheet } from '../../libs'

import { colors, sizes } from '../styles'

export const icon = style({
  height: rem(sizes.itemIcon),
  width: rem(sizes.itemIcon)
})

export const link = style()

export const name = style()

export const tooltip = stylesheet({
  attribute: {
  },
  bonusActive: {
    color: colors.bonusActive.toString()
  },
  bonusInactive: {
    color: colors.bonusInactive.toString()
  },
  coin: {
    marginLeft: rem(2 * sizes.gap)
  },
  consumable: {
    alignItems: 'flex-start',
    display: 'flex'
  },
  head: {
    alignItems: 'center',
    display: 'flex'
  },
  icon: {
    border: border({
      style: 'solid',
      width: px(1)
    }),
    borderColor: colors.tooltipItemBorder,
    borderRadius: rem(0.0625),
    height: rem(sizes.tooltipItemIcon),
    marginRight: rem(sizes.gap),
    width: rem(sizes.tooltipItemIcon)
  },
  name: {
  },
  nestedIcon: {
    height: rem(sizes.tooltipNestedIcon),
    marginRight: rem(sizes.gap),
    width: rem(sizes.tooltipNestedIcon)
  },
  statAttribute: {
    color: colors.statAttribute.toString()
  },
  statBuff: {
    color: colors.statBuff.toString()
  },
  statItem: {
    color: colors.statItem.toString()
  }
})

export const flavors = stylesheet({
  flavor: {
    color: colors.formatFlavor.toString()
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
