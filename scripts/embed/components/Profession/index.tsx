import * as m from 'mithril'

import { cx } from '../../libs'
import {
  GW2Profession,
  GW2Specialization,
  HasIconAttributes,
  HasIconLinkAttributes,
  HasIDAttributes,
  HasInlineAttributes,
  HasStoreAttributes,
  HasTextAttributes,
  HasTextLinkAttributes
} from '../../types'

import { Container } from '../Container'
import { Icon } from '../Icon'
import { Link } from '../Link'
import { Text } from '../Text'

import { buildWikiLink, parseProfessionClassNames } from './libs'

import * as styles from './styles'

interface ProfessionAttributes extends
  m.Attributes,
  HasIconAttributes,
  HasIconLinkAttributes,
  HasIDAttributes<string>,
  HasInlineAttributes,
  HasStoreAttributes,
  HasTextAttributes,
  HasTextLinkAttributes
{
  elite?: GW2Specialization;
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
      elite,
      inline,
      link,
      overrideText,
      profession,
      store
    }
  }: m.Vnode<ProfessionAttributes>): m.Children {
    const icon = elite && elite.elite && elite.profession === profession.id ?
      elite.profession_icon_big :
      profession.icon_big

    const name = elite && elite.elite && elite.profession === profession.id ?
      elite.name :
      profession.name

    const text = overrideText ?? name

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
          src={icon}
        >
          {
            !disableIconLink ?
            <Link href={link ?? buildWikiLink(store, name)} /> :
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
              href={link ?? buildWikiLink(store, name)}
            >{text}</Link> :
            text
          }</Text> :
        null
      }
    </Container>
  }
}
