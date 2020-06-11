import * as m from 'mithril'

import { slice } from 'lodash/fp'

import { GW2Trait, TooltipType } from '../../types'

import { SkillTooltip } from '../Skill/Tooltip'
import {
  Tooltip,
  TooltipBody,
  TooltipContent,
  TooltipFact,
  TooltipHead
} from '../Tooltip'

import { markup, sortFacts } from './lib'

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
  index?: number;
}

export class TraitTooltip implements m.Component<TraitTooltipAttributes> {
  public view({
    attrs: {
      index,
      trait
    }
  }: m.Vnode<TraitTooltipAttributes>): m.Children {
    return m.fragment({}, [
      ...(
        trait.skills ?
        slice(index || 0, 1)(trait.skills).map(skill =>
          <SkillTooltip key={skill.id} skill={skill} />
        ) :
        []
      ),
      <TooltipContent key="trait" type="trait">
        <TooltipHead className={styles.tooltip.head}>{trait.name}</TooltipHead>
        <TooltipBody>
          {m.trust(markup(trait.description, styles.flavors))}
        </TooltipBody>
        {sortFacts(trait.facts).map((fact, index) => {
          return <TooltipFact key={index} fact={fact} />
        })}
      </TooltipContent>
    ])
  }
}

Tooltip.bindTooltipRenderer(TooltipType.GW2_TRAIT, TraitTooltip)
