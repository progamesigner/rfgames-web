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

import { bindTooltipEvents } from '../helpers'

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
}

export class Empty implements m.Component<EmptyAttributes> {
  public view({
    attrs: {
      classIcon,
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
      store
    }
  }: m.Vnode<EmptyAttributes>): m.Children {
    const text = overrideEmptyText || overrideText || 'Not Found'

    const tooltipEvents = !disableTooltip ?
      bindTooltipEvents(store, TooltipType.TEXT, {
        text: overrideTooltipText || text
      }) :
      {}

    return <Container type="empty">
      {
        !disableIcon ?
        <Icon
          className={cx(styles.icon.root, classIcon, 'is-empty')}
          classSize={cx(
            { [styles.icon.block] : !inline },
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
          className={cx(styles.text, classText, 'is-empty')}
          {...tooltipEvents}
        >{text}</Text> :
        null
      }
    </Container>
  }
}
