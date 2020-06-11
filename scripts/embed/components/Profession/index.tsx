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

import { buildWikiLink, parseProfessionClassNames } from './lib'

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
      text,
      ...attrs
    }
  }: m.Vnode<ProfessionAttributes>): m.Children {
    const classes = parseProfessionClassNames(data)

    return <Container inline={true} type="profession" {...attrs}>
      {
        !disableIcon ?
        <Icon
          className={cx(styles.icon, classes)}
          classSize={styles.iconSize}
          placeholder={true}
          src={data.icon_big}
        /> :
        null
      }
      {
        !disableText ?
        <Name className={cx(styles.name, classes)}>
          {
            !disableLink ?
            <Link
              className={styles.link}
              href={buildWikiLink(data.name)}
            >{text || data.name}</Link> :
            text || data.name
          }</Name> :
        null
      }
    </Container>
  }
}
