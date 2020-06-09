import * as m from 'mithril'

import { noop } from 'lodash/fp'

import { cx } from '../../libs'
import { HasRenderAttributes } from '../../types'

import { Container } from '../Container'
import { Icon } from '../Icon'

import * as styles from './styles'

interface LoaderAttributes extends m.Attributes, HasRenderAttributes {
  classSize?: string;
}

export class Loader implements m.Component<LoaderAttributes> {
  public view({
    attrs: {
      className,
      classSize,
      disableIcon,
      disableLink,
      disableText,
      inline,
      ...attrs
    }
  }: m.Vnode<LoaderAttributes>): m.Children {
    noop(disableLink)

    return <Container inline={!disableText || inline} type="loader" {...attrs}>
      {
        !disableIcon ?
        <Icon
          className={cx(styles.icon, 'is-loader')}
          classSize={cx(styles.size, classSize)}
          inline={!disableText || inline}
        ><span className={cx(styles.loader, className)}></span></Icon> :
        null
      }
    </Container>
  }
}
