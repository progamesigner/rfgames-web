import * as m from 'mithril'

import { cx } from '../../libs'
import {
  GW2Profession,
  HasIconAttributes,
  HasIconLinkAttributes,
  HasIDAttributes,
  HasTextAttributes,
  HasTextLinkAttributes
} from '../../types'

import { Container } from '../Container'
import { Icon } from '../Icon'
import { Link } from '../Link'
import { Text } from '../Text'

import { buildWikiLink, parseProfessionClassNames } from './lib'

import * as styles from './styles'

interface ProfessionAttributes extends
  m.Attributes,
  HasIconAttributes,
  HasIconLinkAttributes,
  HasIDAttributes<string>,
  HasTextAttributes,
  HasTextLinkAttributes
{
  profession: GW2Profession;
}

export class Profession implements m.Component<ProfessionAttributes> {
  public view({
    attrs: {
      disableIcon,
      disableIconLink,
      disableText,
      disableTextLink,
      link,
      overrideText,
      profession
    }
  }: m.Vnode<ProfessionAttributes>): m.Children {
    const classes = parseProfessionClassNames(profession)
    const name = overrideText || profession.name

    return <Container type="profession">
      {
        !disableIcon ?
        <Icon
          className={cx(styles.icon, classes)}
          classSize={styles.iconSize}
          disablePlaceholder={true}
          src={profession.icon_big}
        >
          {
            !disableIconLink ?
            <Link href={link || buildWikiLink(profession.name)} /> :
            null
          }
        </Icon> :
        null
      }
      {
        !disableText ?
        <Text className={cx(styles.name, classes)}>
          {
            !disableTextLink ?
            <Link
              className={styles.link}
              href={link || buildWikiLink(profession.name)}
            >{name}</Link> :
            name
          }</Text> :
        null
      }
    </Container>
  }
}
