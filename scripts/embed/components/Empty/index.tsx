import * as m from 'mithril'

import { cx } from '../../libs'
import {
  HasEmptyTextAttributes,
  HasIconAttributes,
  HasIconPlaceholderAttributes,
  HasInlineAttributes,
  HasStoreAttributes,
  HasTextAttributes,
  HasTooltipAttributes,
  HasTooltipTextAttributes,
  TooltipType
} from '../../types'

import { Container } from '../Container'
import { Icon } from '../Icon'
import { Text } from '../Text'

import { bindTooltipEvents, TypeWithIconSize } from './libs'

import * as styles from './styles'

interface EmptyAttributes extends
  m.Attributes,
  HasIconAttributes,
  HasIconPlaceholderAttributes,
  HasInlineAttributes,
  HasStoreAttributes,
  HasEmptyTextAttributes,
  HasTextAttributes,
  HasTooltipAttributes,
  HasTooltipTextAttributes
{
  type: TypeWithIconSize;
}

export class Empty implements m.Component<EmptyAttributes> {
  public view({
    attrs: {
      classIcon,
      className,
      classSize,
      classText,
      disableIcon,
      disableIconPlaceholder,
      disableText,
      disableTooltip,
      inline,
      overrideEmptyText,
      overrideText,
      overrideTooltipText,
      store,
      type
    }
  }: m.Vnode<EmptyAttributes>): m.Children {
    const text = overrideEmptyText || overrideText || 'Not Found'

    const tooltipEvents = !disableTooltip ?
      bindTooltipEvents(store, TooltipType.TEXT, {
        text: overrideTooltipText || text
      }) :
      {}

    return <Container className={cx('is-empty', className)} type="empty">
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
          {...tooltipEvents}
        /> :
        null
      }
      {
        !disableText ?
        <Text
          className={cx(styles.text, classText)}
          {...tooltipEvents}
        >{text}</Text> :
        null
      }
    </Container>
  }
}
