import * as m from 'mithril'

import {
  copper as copperImage,
  gold as goldImage,
  silver as silverImage
} from '../../images'
import { cx } from '../../libs'

import { Icon } from '../Icon'

import * as styles from './styles'

interface CoinAttributes extends m.Attributes {
  value: number
}

function renderIcon(
  value: number,
  className: string,
  image: string
): m.Children {
  return <span className={className}>
    <span>{value.toLocaleString()}</span>
    <Icon
      className={styles.icon.root}
      classSize={styles.icon.size}
      disablePlaceholder={true}
      src={image}
    />
  </span>
}

export class Coin implements m.Component<CoinAttributes> {
  public view({
    attrs: {
      className,
      value
    }
  }: m.Vnode<CoinAttributes>): m.Children {
    const gold = Math.floor(value / 10000)
    const silver = Math.floor(value % 10000 / 100)
    const copper = value % 100

    return <div className={cx(styles.root, className)}>
      {gold > 0 ? renderIcon(gold, styles.gold, goldImage) : null}
      {gold > 0 || silver > 0 ? renderIcon(silver, styles.silver, silverImage) : null}
      {renderIcon(copper, styles.copper, copperImage)}
    </div>
  }
}
