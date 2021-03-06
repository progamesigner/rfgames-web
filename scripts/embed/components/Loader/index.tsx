import * as m from 'mithril'

import { cx } from '../../libs'
import {
  HasIconAttributes,
  HasIconPlaceholderAttributes,
  HasInlineAttributes,
  HasTextAttributes
} from '../../types'

import { Container } from '../Container'
import { Icon } from '../Icon'
import { LoadingStrip } from '../LoadingStrip'

import { TypeWithIconSize } from './libs'

import * as styles from './styles'

interface LoaderAttributes extends
  m.Attributes,
  HasIconAttributes,
  HasIconPlaceholderAttributes,
  HasInlineAttributes,
  HasTextAttributes
{
  classLoader?: string;
  type: TypeWithIconSize;
}

export class Loader implements m.Component<LoaderAttributes> {
  public view({
    attrs: {
      classIcon,
      classLoader,
      className,
      classSize,
      classText,
      disableIcon,
      disableIconPlaceholder,
      disableText,
      inline,
      overrideText,
      type
    }
  }: m.Vnode<LoaderAttributes>): m.Children {
    return <Container className={cx('is-loader', className)} type="loader">
      {
        !disableIcon ?
        <Icon
          className={cx(styles.icon.root, classIcon)}
          classSize={cx(
            { [styles.icon[type]] : !inline },
            { [styles.icon.inline] : inline },
            classSize
          )}
          disablePlaceholder={disableIconPlaceholder || inline}
        ><span className={cx(styles.loader, classLoader)}></span></Icon> :
        null
      }
      {
        !disableText ?
        <LoadingStrip
          className={cx(styles.text, classText)}
          text={overrideText}
        >
        </LoadingStrip> :
        null
      }
    </Container>
  }
}
