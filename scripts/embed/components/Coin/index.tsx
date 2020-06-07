import * as m from 'mithril'

import { floor } from 'lodash/fp'

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

export class Coin implements m.Component<CoinAttributes> {
  public view({
    attrs: {
      className,
      value,
      ...attrs
    }
  }: m.Vnode<CoinAttributes>): m.Children {
    const gold = floor(value / 10000)
    const silver = floor(value % 10000 / 100)
    const copper = value % 100

    return <div className={cx(styles.root, className)} {...attrs}>
      {
        gold > 0 ?
        <span className={styles.gold}>
          <span>{gold}</span>
          <Icon classSize={styles.size} inline={true} src={goldImage} />
        </span> :
        null
      }
      {
        gold > 0 || silver > 0 ?
        <span className={styles.silver}>
          <span>{silver}</span>
          <Icon classSize={styles.size} inline={true} src={silverImage} />
        </span> :
        null
      }
      <span className={styles.copper}>
        <span>{copper}</span>
        <Icon classSize={styles.size} inline={true} src={copperImage} />
      </span>
    </div>
  }
}
