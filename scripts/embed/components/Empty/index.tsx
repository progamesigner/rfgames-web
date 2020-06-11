import * as m from 'mithril'

import { noop } from 'lodash/fp'

import { HasRenderAttributes } from '../../types'

import { Container } from '../Container'
import { Icon } from '../Icon'

import * as styles from './styles'

interface EmptyAttributes extends m.Attributes, HasRenderAttributes {
  type: string;
}

export class Empty implements m.Component<EmptyAttributes> {
  public view({
    attrs: {
      disableIcon,
      disableLink,
      disableText,
      disableTooltip,
      type,
      ...attrs
    },
    children
  }: m.Vnode<EmptyAttributes>): m.Children {
    noop(disableLink, disableText, disableTooltip)

    return <Container inline={true} type={type} {...attrs}>
      {
        !disableIcon ?
        <Icon
          className={styles.icon}
          classSize={styles.iconSize}
          placeholder={true}
        /> :
        null
      }
      {children}
    </Container>
  }
}
