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

const CONNECTOR_FROM_STYLES = {
  0: styles.connector.fromTop,
  1: styles.connector.fromMiddle,
  2: styles.connector.fromBottom
} as { [index: number]: string; }

const CONNECTOR_TO_STYLES = {
  0: styles.connector.toTop,
  1: styles.connector.toMiddle,
  2: styles.connector.toBottom
} as { [index: number]: string; }

export const enum TraitMode {
  ID = 0,
  POSITION = 1
}

export const enum TraitPosition {
  NONE = 0,
  TOP = 1,
  MIDDLE = 2,
  BOTTOM = 3
}

interface TraitLineAttributes extends
  m.Attributes,
  HasIDAttributes<number>,
  HasStoreAttributes,
  HasTooltipAttributes
{
  data: GW2Specialization;
  selectedTraits: Array<TraitSelection>;
}

export type TraitSelection = [TraitMode, TraitPosition | number]

function mapSelectionToIds(
  data: GW2Specialization,
  selectedTraits: Array<TraitSelection>
): Array<number> {
  return selectedTraits.map(([mode, value], tier) => {
    switch (mode) {
      case TraitMode.POSITION:
        return (
          value !== TraitPosition.NONE ?
          data.major_traits[value + 3 * tier - 1] :
          0
        )
      case TraitMode.ID:
      default:
        return value
    }
  })
}

export class TraitLine implements m.Component<TraitLineAttributes> {
  public view({
    attrs: {
      className,
      data,
      disableTooltip,
      selectedTraits,
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
    const selectedTraitIds = mapSelectionToIds(data, selectedTraits)

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
          <div
            key={`connector-to-${tier}`}
            className={cx(
              styles.connector.root,
              CONNECTOR_TO_STYLES[majorTraitChunks[tier].findIndex(id => selectedTraitIds.includes(id))]
            )}
          ></div>,
          <div key={`major-${tier}`} className={styles.traits.major}>
            {majorTraitChunks[tier].map(majorTrait => <Trait
              key={`major-${tier}-${majorTrait}`}
              id={majorTrait}
              className={cx(
                styles.traits.majorIcon,
                { [styles.traits.inactive]: !selectedTraitIds.includes(majorTrait) }
              )}
              disableText={true}
              inline={true}
              store={store}
            />)}
          </div>,
          <div
            key={`connector-from-${tier}`}
            className={cx(
              styles.connector.root,
              CONNECTOR_FROM_STYLES[majorTraitChunks[tier].findIndex(id => selectedTraitIds.includes(id))],
              { [styles.connector.disabled]: tier === 2}
            )}
          ></div>
        ]))}
      </div>
    </Container>
  }
}
