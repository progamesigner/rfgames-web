import * as m from 'mithril'

import { GW2Trait, TooltipType } from '../../types'

import { SkillTooltip } from '../Skill/Tooltip'
import {
  Tooltip,
  TooltipBody,
  TooltipContent,
  TooltipFact,
  TooltipHead
} from '../Tooltip'

import { markup } from '../parser'

import * as styles from './styles'

declare module '../../types/tooltip' {
  const enum TooltipType {
    GW2_TRAIT = 'GW2Trait'
  }

  interface TooltipTypeMapping {
    [TooltipType.GW2_TRAIT]: TraitTooltipAttributes;
  }
}

interface TraitTooltipAttributes extends m.Attributes {
  trait: GW2Trait;
}

export class TraitTooltip implements m.Component<TraitTooltipAttributes> {
  public view({
    attrs: {
      trait
    }
  }: m.Vnode<TraitTooltipAttributes>): m.Children {
    return m.fragment({}, [
      ...(
        trait.skills ?
        trait.skills.slice(0, 1).map(skill =>
          <SkillTooltip key={skill.id} {...skill} />
        ) :
        []
      ),
      <TooltipContent key="trait" type="trait">
        <TooltipHead className={styles.tooltip.head}>{trait.name}</TooltipHead>
        <TooltipBody>
          {m.trust(markup(trait.description, styles.flavors))}
        </TooltipBody>
        {trait.facts.map((fact, index) => {
          return <TooltipFact key={index} data={fact} />
        })}
      </TooltipContent>
    ])
  }
}

Tooltip.bindTooltipRenderer(TooltipType.GW2_TRAIT, TraitTooltip)
