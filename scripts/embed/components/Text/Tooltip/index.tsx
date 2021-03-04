import * as m from 'mithril'

import { TooltipType } from '../../../types'

import { Tooltip, TooltipContent, TooltipBody } from '../../Tooltip'

declare module '../../../types/tooltip' {
  const enum TooltipType {
    TEXT = 'Text'
  }

  interface TooltipTypeMapping {
    [TooltipType.TEXT]: TextTooltipAttributes;
  }
}

interface TextTooltipAttributes extends m.Attributes {
  text: string;
}

export class TextTooltip implements m.Component<TextTooltipAttributes> {
  public view({
    attrs: {
      text
    }
  }: m.Vnode<TextTooltipAttributes>): m.Children {
    return<TooltipContent type="text">
      <TooltipBody>{text}</TooltipBody>
    </TooltipContent>
  }
}

Tooltip.bindTooltipRenderer(TooltipType.TEXT, TextTooltip)
