import * as m from 'mithril'

import { cx } from '../../libs'
import {
  HasEmptyAttributes,
  HasIconAttributes,
  HasIconPlaceholderAttributes,
  HasStoreAttributes,
  HasTextAttributes,
  HasTooltipAttributes,
  TooltipType
} from '../../types'

import { Container } from '../Container'
import { Icon } from '../Icon'
import { Text } from '../Text'

import { bindTooltipEvents } from '../helpers'

import * as styles from './styles'

interface EmptyAttributes extends
  m.Attributes,
  HasEmptyAttributes,
  HasIconAttributes,
  HasIconPlaceholderAttributes,
  HasStoreAttributes,
  HasTextAttributes,
  HasTooltipAttributes
{
  classIcon?: string;
  classSize?: string;
  classText?: string;
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
      overrideText,
      overrideTooltipText,
      store
    }
  }: m.Vnode<EmptyAttributes>): m.Children {
    const text = overrideText || 'Empty'

    const tooltipEvents = !disableTooltip ?
      bindTooltipEvents(store, TooltipType.TEXT, {
        text: overrideTooltipText || text
      }) :
      {}

    return <Container type="empty">
      {
        !disableIcon ?
        <Icon
          className={cx(styles.icon, classIcon, 'is-empty')}
          classSize={cx(styles.iconSize, classSize)}
          disablePlaceholder={disableIconPlaceholder}
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
