import { em, sizes, style, stylesheet } from '../styles'

export const icon = stylesheet({
  root: {
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
