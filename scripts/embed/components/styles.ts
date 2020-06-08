import { borderColor, color, percent } from '../libs'

export * from '../libs'

export const colors = {
  applyCount: color('#fff4cf'),
  bonusActive: color('#5599FF'),
  bonusInactive: color('#AAAAAA'),
  coinCopper: color('#a0673a'),
  coinGold: color('#e5be45'),
  coinSilver: color('#cbcac8'),
  embedBackground: color('#151718'),
  embedBorder: color('#151718').darken(percent(25)),
  formatAbilityType: color('#FFC90E'),
  formatFlavor: color('#94DCD2'),
  formatReminder: color('#4564A1'),
  formatSkill: color('#EFDF80'),
  rarityAscended: color('#FB3E8D'),
  rarityBasic: color('#EEEEEE'),
  rarityExotic: color('#FFA405'),
  rarityFine: color('#62A4DA'),
  rarityJunk: color('#AAAAAA'),
  rarityLegendary: color('#9B6BDE'),
  rarityMasterwork: color('#1A9306'),
  rarityRare: color('#FCD00B'),
  statAttribute: color('#5599ff'),
  statBuff: color('#5599ff'),
  statItem: color('#30ad37'),
  tooltipBackground: color('#151718'),
  tooltipBorder: color('#151718'),
  tooltipFact: color('rgba(255, 255, 255, 0.7)'),
  tooltipItemBorder: borderColor(color('#9d9e9f').toString(), color('#333333').toString(), color('#333333').toString(), color('#9d9e9f').toString()),
  tooltipShadow: color('#151718'),
  tooltipSkillTitle: color('#EFDF80'),
  tooltipText: color('#9D9E9F'),
  tooltipTextShadow: color('#151718'),
  tooltipTitle: color('#FFFFFF')
}

export const fonts = {
  applyCount: {
    fontSize: 0.75
  },
  fact: {
    fontSize: 0.85
  },
  text: {
    fontFamily: 'Open Sans, sans-serif',
    fontSize: 0.875
  },
  title: {
    fontFamily: 'Menomonia, serif',
    fontSize: 1
  }
}

export const images = {
  embedBackground: `radial-gradient(circle, ${color('#606468').toString()}, ${color('#333333').toString()})`
}

export const sizes = {
  applyCountPadding: 0.25,
  coinIcon: 1,
  defaultIcon: 4,
  factIcon: 2,
  gap: 0.25,
  inlineIcon: 1,
  rechargeIcon: 1.125,
  tooltipItemIcon: 2.5,
  tooltipNestedIcon: 2,
  tooltipRadius: 0.125
}

export const zIndices = {
  applyCount: 100,
  tooltip: 1000
}
