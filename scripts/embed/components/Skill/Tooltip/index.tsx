import * as m from 'mithril'

import { GW2Skill, TooltipType } from '../../../types'

import {
  Tooltip,
  TooltipBody,
  TooltipContent,
  TooltipFact,
  TooltipHead
} from '../../Tooltip'

import { addSkillTypeTags, applyTraitedFacts, markup, sortFacts } from './libs'

import * as styles from './styles'

declare module '../../../types/tooltip' {
  const enum TooltipType {
    GW2_SKILL = 'GW2Skill'
  }

  interface TooltipTypeMapping {
    [TooltipType.GW2_SKILL]: SkillTooltipAttributes;
  }
}

interface SkillTooltipAttributes extends m.Attributes {
  activeTraits?: ReadonlyArray<number>;
  skill: GW2Skill;
}

export class SkillTooltip implements m.Component<SkillTooltipAttributes> {
  public view({
    attrs: {
      activeTraits,
      skill
    }
  }: m.Vnode<SkillTooltipAttributes>): m.Children {
    const facts = skill.facts ?
      sortFacts(
        applyTraitedFacts(skill.facts, activeTraits ?? [], skill.traited_facts),
        traitedFact => traitedFact.fact.type
      ) :
      []

    return <TooltipContent type="skill">
      <TooltipHead className={styles.head}>{skill.name}</TooltipHead>
      {
        skill.description ?
        <TooltipBody className={styles.body}>
          {m.trust(markup(addSkillTypeTags(skill.description), styles.flavors))}
        </TooltipBody> :
        null
      }
      {facts.map((traitedFact, index) => <TooltipFact key={index} {...traitedFact} />)}
    </TooltipContent>
  }
}

Tooltip.bindTooltipRenderer(TooltipType.GW2_SKILL, SkillTooltip)
