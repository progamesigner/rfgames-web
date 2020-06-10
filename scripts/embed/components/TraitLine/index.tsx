import * as m from 'mithril'

import { chunk, range } from 'lodash/fp'

import { Trait } from '../../containers'
import { cx } from '../../libs'
import {
  GW2Specialization,
  HasIDAttributes,
  HasStoreAttributes,
  HasTooltipAttributes,
  TooltipType
} from '../../types'

import { Container } from '../Container'

import { bindTooltipEvents } from '../helpers'

import * as styles from './styles'

interface TraitLineAttributes extends
  m.Attributes,
  HasIDAttributes<number>,
  HasStoreAttributes,
  HasTooltipAttributes
{
  data: GW2Specialization;
}

export class TraitLine implements m.Component<TraitLineAttributes> {
  public view({
    attrs: {
      className,
      data,
      disableTooltip,
      store,
      ...attrs
    }
  }: m.Vnode<TraitLineAttributes>): m.Children {
    const {
      background,
      elite,
      major_traits,
      minor_traits
    } = data

    const majorTraitChunks = chunk(3)(major_traits)

    const tooltipEvents = !disableTooltip ?
      bindTooltipEvents(store, TooltipType.GW2_SPECIALIZATION, data) :
      {}

    return <Container
      className={cx(styles.root, { [styles.elite]: elite }, className)}
      inline={false}
      type="traitline"
      {...attrs}
    >
      <div
        className={cx(styles.background, styles.backgroundImage(background))}
      ></div>

      <div className={styles.specialization.root}>
        <div className={styles.specialization.hexagon} {...tooltipEvents}></div>
      </div>

      <div className={styles.traits.root}>
        {range(0, 3).map(tier => m.fragment({}, [
          <div key={`minor-${tier}`} className={styles.traits.minor}>
            <Trait
              id={minor_traits[tier]}
              className={styles.traits.minorIcon}
              disableText={true}
              inline={true}
              store={store}
            />
          </div>,
          <div key={`major-${tier}`} className={styles.traits.major}>
            {majorTraitChunks[tier].map(majorTrait => <Trait
              key={`major-${tier}-${majorTrait}`}
              id={majorTrait}
              className={styles.traits.majorIcon}
              disableText={true}
              inline={true}
              store={store}
            />)}
          </div>
        ]))}
      </div>
    </Container>
  }
}
