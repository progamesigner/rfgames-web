import * as m from 'mithril'

import { cx } from '../../libs'
import {
  GW2Profession,
  HasIDAttributes,
  HasRenderAttributes
} from '../../types'

import { Container } from '../Container'
import { Icon } from '../Icon'
import { Link } from '../Link'
import { Name } from '../Name'

import { buildWikiLink } from '../helpers'

import * as styles from './styles'

interface ProfessionAttributes extends
  m.Attributes,
  HasIDAttributes<string>,
  HasRenderAttributes
{
  data: GW2Profession;
  text?: string;
}

export class Profession implements m.Component<ProfessionAttributes> {
  public view({
    attrs: {
      data,
      disableIcon,
      disableLink,
      disableText,
      inline,
      text,
      ...attrs
    }
  }: m.Vnode<ProfessionAttributes>): m.Children {
    const {
      icon_big,
      id,
      name
    } = data

    return <Container inline={!disableText || inline} type="profession" {...attrs}>
      {
        !disableIcon ?
        <Icon
          className={cx(styles.icon, 'is-profession', `is-${id.toLowerCase()}`)}
          classSize={styles.size}
          inline={!disableText || inline}
          src={icon_big}
        /> :
        null
      }
      {
        !disableText ?
        <Name className={styles.name}>
          {
            !disableLink ?
            <Link className={styles.link} href={buildWikiLink(name)}>{text || name}</Link> :
            text || name
          }</Name> :
        null
      }
    </Container>
  }
}
