import * as m from 'mithril'

import { GW2Specialization, TooltipType } from '../../../types'

import { Tooltip, TooltipContent, TooltipHead } from '../../Tooltip'

import * as styles from './styles'

declare module '../../../types/tooltip' {
  const enum TooltipType {
    GW2_SPECIALIZATION = 'GW2Specialization'
  }

  interface TooltipTypeMapping {
    [TooltipType.GW2_SPECIALIZATION]: SpecializationTooltipAttributes;
  }
}

interface SpecializationTooltipAttributes extends m.Attributes {
  specialization: GW2Specialization;
}

export class SpecializationTooltip implements m.Component<SpecializationTooltipAttributes> {
  public view({
    attrs: {
      specialization
    }
  }: m.Vnode<SpecializationTooltipAttributes>): m.Children {
    return<TooltipContent type="specialization">
      <TooltipHead
        className={styles.head}
      >{specialization.name}</TooltipHead>
    </TooltipContent>
  }
}

Tooltip.bindTooltipRenderer(TooltipType.GW2_SPECIALIZATION, SpecializationTooltip)
