import * as m from 'mithril'

import { cx } from '../../libs'
import {
  GW2Specialization,
  HasIDAttributes,
  HasRenderAttributes,
  HasStoreAttributes,
  HasTooltipAttributes,
  TooltipType
} from '../../types'

import { Container } from '../Container'
import { Icon } from '../Icon'
import { Link } from '../Link'
import { Name } from '../Name'

import './Tooltip'

import {
  bindTooltipEvents,
  buildWikiLink,
  parseSpecializationClassNames
} from './lib'

import * as styles from './styles'

interface SpecializationAttributes extends
  m.Attributes,
  HasIDAttributes<number>,
  HasRenderAttributes,
  HasStoreAttributes,
  HasTooltipAttributes
{
  data: GW2Specialization;
}

export class Specialization implements m.Component<SpecializationAttributes> {
  public view({
    attrs: {
      data,
      disableIcon,
      disableLink,
      disableText,
      disableTooltip,
      store,
      ...attrs
    }
  }: m.Vnode<SpecializationAttributes>): m.Children {
    const classes = parseSpecializationClassNames(data)

    const tooltipEvents = !disableTooltip ?
      bindTooltipEvents(store, TooltipType.GW2_SPECIALIZATION, {
        specialization: data
      }) :
      {}

    return <Container inline={true} type="trait" {...attrs}>
      {
        !disableIcon ?
        <Icon
          className={cx(styles.icon, classes)}
          classSize={styles.iconSize}
          placeholder={true}
          src={data.icon}
          {...tooltipEvents}
        /> :
        null
      }
      {
        !disableText ?
        <Name className={cx(styles.name, classes)} {...disableLink && tooltipEvents}>
          {
            !disableLink ?
            <Link
              className={styles.link}
              href={buildWikiLink(data.name)}
              {...!disableLink && tooltipEvents}
            >{data.name}</Link> :
            data.name
          }
        </Name> :
        null
      }
    </Container>
  }
}
