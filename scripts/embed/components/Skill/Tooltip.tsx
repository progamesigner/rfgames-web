import * as m from 'mithril'

import { GW2Skill, TooltipType } from '../../types'

import {
  Tooltip,
  TooltipBody,
  TooltipContent,
  TooltipFact,
  TooltipHead
} from '../Tooltip'

import { addSkillTypeTags, markup } from './lib'

import * as styles from './styles'

declare module '../../types/tooltip' {
  const enum TooltipType {
    GW2_SKILL = 'GW2Skill'
  }

  interface TooltipTypeMapping {
    [TooltipType.GW2_SKILL]: SkillTooltipAttributes;
  }
}

interface SkillTooltipAttributes extends m.Attributes {
  skill: GW2Skill;
}

export class SkillTooltip implements m.Component<SkillTooltipAttributes> {
  public view({
    attrs: {
      skill
    }
  }: m.Vnode<SkillTooltipAttributes>): m.Children {
    return <TooltipContent type="skill">
      <TooltipHead className={styles.tooltip.head}>{skill.name}</TooltipHead>

      {
        skill.description ?
        <TooltipBody className={styles.tooltip.body}>
          {m.trust(markup(addSkillTypeTags(skill.description), styles.flavors))}
        </TooltipBody> :
        null
      }

      {
        skill.facts ? skill.facts.map((fact, index) => {
          return <TooltipFact key={index} fact={fact} />
        }) :
        null
      }
    </TooltipContent>
  }
}

Tooltip.bindTooltipRenderer(TooltipType.GW2_SKILL, SkillTooltip)
