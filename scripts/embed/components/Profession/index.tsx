import * as m from 'mithril'

import { cx } from '../../libs'
import {
  GW2Profession,
  HasIconAttributes,
  HasIconLinkAttributes,
  HasIDAttributes,
  HasInlineAttributes,
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
  HasInlineAttributes,
  HasTextAttributes,
  HasTextLinkAttributes
{
  profession: GW2Profession;
}

export class Profession implements m.Component<ProfessionAttributes> {
  public view({
    attrs: {
      classIcon,
      className,
      classSize,
      classText,
      disableIcon,
      disableIconLink,
      disableText,
      disableTextLink,
      inline,
      link,
      overrideText,
      profession
    }
  }: m.Vnode<ProfessionAttributes>): m.Children {
    const name = overrideText || profession.name

    return <Container
      className={cx(parseProfessionClassNames(profession), className)}
      type="profession"
    >
      {
        !disableIcon ?
        <Icon
          className={cx(styles.icon.root, classIcon)}
          classSize={cx(
            { [styles.icon.block] : !inline },
            { [styles.icon.inline] : inline },
            classSize
          )}
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
        <Text className={cx(styles.name, classText)}>
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
