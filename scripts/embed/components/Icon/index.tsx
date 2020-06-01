import * as m from 'mithril'

import { cx } from '../../libs'
import { EmbedAttributes } from '../../types'

import { iconStyle, iconImageStyle } from './styles'

export interface IconAttributes extends EmbedAttributes {
  src: string;
}

export default class implements m.Component<IconAttributes> {
  public view({
    attrs
  }: m.Vnode<IconAttributes>): m.Children {
    const {
      classes,
      src
    } = attrs

    return <div
      class={cx(iconStyle, iconImageStyle(src), classes, 'gw2-embed-icon')}
    >
    </div>
  }
}
