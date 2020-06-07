import * as m from 'mithril'

import { GW2Skill, TooltipType } from '../../types'

import {
  Tooltip,
  TooltipBody,
  TooltipContent,
  TooltipFact,
  TooltipHead
} from '../Tooltip'

import { addSkillTypeTags, markup } from '../parser'

declare module '../../types/tooltip' {
  const enum TooltipType {
    GW2_SKILL = 'GW2Skill'
  }

  interface TooltipTypeMapping {
    [TooltipType.GW2_SKILL]: [SkillTooltipAttributes, GW2Skill];
  }
}

type SkillTooltipAttributes = GW2Skill

export class SkillTooltip implements m.Component<SkillTooltipAttributes> {
  public view({ attrs: data }: m.Vnode<SkillTooltipAttributes>): m.Children {
    const {
      description,
      name,
      facts
    } = data

    return <TooltipContent type="skill">
      <TooltipHead>{name}</TooltipHead>
      <TooltipBody>{m.trust(markup(addSkillTypeTags(description)))}</TooltipBody>
      {facts.map((fact, index) => {
        return <TooltipFact key={index} data={fact} />
      })}
    </TooltipContent>
  }
}

Tooltip.bindTooltipRenderer(TooltipType.GW2_SKILL, SkillTooltip)
