import * as m from 'mithril'

import { cx, makeClassName } from '../../libs'
import { ExtractTooltipAttributeType, TooltipType } from '../../types'

import * as styles from './styles'

export { TooltipBody } from './Body'
export { TooltipContent } from './Content'
export { TooltipFact } from './Fact'
export { TooltipFoot } from './Foot'
export { TooltipHead } from './Head'

interface TooltipAttributes extends m.Attributes {
  data: ExtractTooltipAttributeType<TooltipType>;
  type: TooltipType;
  show: boolean;
}

export class Tooltip implements m.Component<TooltipAttributes> {
  protected static renderers = {} as Record<TooltipType, (attrs: m.Attributes) => m.Children>;

  public static bindTooltipRenderer<
    T extends TooltipType,
    A extends ExtractTooltipAttributeType<T>
  >(type: T, component: m.ComponentTypes<A>): void {
    Tooltip.renderers[type] = (attrs: m.Attributes) => m(component, attrs)
  }

  public view({
    attrs: {
      className,
      data,
      show,
      type,
      ...attrs
    }
  }: m.Vnode<TooltipAttributes>): m.Children {
    const renderer = Tooltip.renderers[type]

    if (show && data && renderer) {
      return <div
        className={cx(styles.root, makeClassName('tooltip'), className)}
        {...attrs}
      >{renderer(data)}</div>
    }

    return null
  }
}

