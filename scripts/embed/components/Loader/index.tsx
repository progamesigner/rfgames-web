import * as m from 'mithril'

import { cx } from '../../libs'
import {
  HasIconAttributes,
  HasIconPlaceholderAttributes,
  HasTextAttributes
} from '../../types'

import { Container } from '../Container'
import { Icon } from '../Icon'
import { Text } from '../Text'

import * as styles from './styles'

interface LoaderAttributes extends
  m.Attributes,
  HasIconAttributes,
  HasIconPlaceholderAttributes,
  HasTextAttributes
{
  classLoader?: string;
}

export class Loader implements m.Component<LoaderAttributes> {
  public view({
    attrs: {
      classIcon,
      classLoader,
      classSize,
      classText,
      disableIcon,
      disableIconPlaceholder,
      disableText,
      overrideText
    }
  }: m.Vnode<LoaderAttributes>): m.Children {
    return <Container type="loader">
      {
        !disableIcon ?
        <Icon
          className={cx(styles.icon.root, classIcon, 'is-loader')}
          classSize={cx(styles.icon.size, classSize)}
          disablePlaceholder={disableIconPlaceholder}
        ><span className={cx(styles.loader, classLoader)}></span></Icon> :
        null
      }
      {
        !disableText ?
        <Text className={cx(styles.text, classText, 'is-loader')}>
          {overrideText || ''}
        </Text> :
        null
      }
    </Container>
  }
}
