import * as m from 'mithril'

import { slice } from 'rambda'

import { GW2Trait, TooltipType } from '../../../types'

import { SkillTooltip } from '../../Skill/Tooltip'
import {
  Tooltip,
  TooltipBody,
  TooltipContent,
  TooltipFact,
  TooltipHead
} from '../../Tooltip'

import { applyTraitedFacts, markup, sortFacts } from './libs'

import * as styles from './styles'

declare module '../../../types/tooltip' {
  const enum TooltipType {
    GW2_TRAIT = 'GW2Trait'
  }

  interface TooltipTypeMapping {
    [TooltipType.GW2_TRAIT]: TraitTooltipAttributes;
  }
}

interface TraitTooltipAttributes extends m.Attributes {
  activeTraits?: ReadonlyArray<number>;
  trait: GW2Trait;
  index?: number;
}

export class TraitTooltip implements m.Component<TraitTooltipAttributes> {
  public view({
    attrs: {
      activeTraits,
      index,
      trait
    }
  }: m.Vnode<TraitTooltipAttributes>): m.Children {
    const facts = trait.facts ?
      sortFacts(
        applyTraitedFacts(trait.facts, activeTraits || [], trait.traited_facts),
        traitedFact => traitedFact.fact.type
      ) :
      []

    return m.fragment({}, [
      ...(
        trait.skills ?
        slice(index || 0, 1)(trait.skills).map(skill =>
          <SkillTooltip key={skill.id} activeTraits={activeTraits} skill={skill} />
        ) :
        []
      ),
      <TooltipContent key="trait" type="trait">
        <TooltipHead className={styles.head}>{trait.name}</TooltipHead>
        <TooltipBody>
          {m.trust(markup(trait.description, styles.flavors))}
        </TooltipBody>
        {facts.map((traitedFact, index) => <TooltipFact key={index} {...traitedFact} />)}
      </TooltipContent>
    ])
  }
}

Tooltip.bindTooltipRenderer(TooltipType.GW2_TRAIT, TraitTooltip)
