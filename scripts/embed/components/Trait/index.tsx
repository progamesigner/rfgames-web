import * as m from 'mithril'

import {
  GW2Trait,
  HasIDAttributes,
  HasRenderAttributes,
  HasStoreAttributes,
  HasTooltipAttributes,
  TooltipType,
} from '../../types'

import { Container } from '../Container'
import { Icon } from '../Icon'
import { Link } from '../Link'
import { Name } from '../Name'

import { bindTooltipEvents, buildWikiLink } from '../helpers'

import './Tooltip'

import * as styles from './styles'

interface TraitAttributes extends
  m.Attributes,
  HasIDAttributes<number>,
  HasRenderAttributes,
  HasStoreAttributes,
  HasTooltipAttributes
{
  data: GW2Trait;
}

export class Trait implements m.Component<TraitAttributes> {
  public view({
    attrs: {
      data,
      disableIcon,
      disableLink,
      disableText,
      disableTooltip,
      inline,
      store,
      ...attrs
    }
  }: m.Vnode<TraitAttributes>): m.Children {
    const {
      icon,
      name
    } = data

    const tooltipEvents = !disableTooltip ?
      bindTooltipEvents(store, TooltipType.GW2_TRAIT, {
        trait: data
      }) :
      {}

    return <Container inline={!disableText || inline} type="trait" {...attrs}>
      {
        !disableIcon ?
        <Icon
          src={icon}
          inline={!disableText || inline}
          className={styles.icon}
          {...tooltipEvents}
        /> :
        null
      }
      {
        !disableText ?
        <Name className={styles.name} {...disableLink && tooltipEvents}>
          {
            !disableLink ?
            <Link
              className={styles.link}
              href={buildWikiLink(name)}
              {...!disableLink && tooltipEvents}
            >{name}</Link> :
            name
          }
        </Name> :
        null
      }
    </Container>
  }
}
