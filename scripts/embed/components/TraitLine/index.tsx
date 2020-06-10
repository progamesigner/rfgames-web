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

function isTraitActive(trait: number, selectedTraits: Array<number>): boolean {
  return !selectedTraits.includes(trait)
}

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

function mapTraitToFromMajor(
  traitsInTier: Array<number>,
  selectedTraits: Array<number>
): string | null {
  switch (traitsInTier.findIndex(id => selectedTraits.includes(id))) {
    case 0:
      return styles.connector.fromTop
    case 1:
      return styles.connector.fromMiddle
    case 2:
      return styles.connector.fromBottom
  }
  return null
}

function mapTraitToFromMinor(
  traitsInTier: Array<number>,
  selectedTraits: Array<number>
): string | null {
  switch (traitsInTier.findIndex(id => selectedTraits.includes(id))) {
    case 0:
      return styles.connector.toTop
    case 1:
      return styles.connector.toMiddle
    case 2:
      return styles.connector.toBottom
  }
  return null
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
              mapTraitToFromMinor(majorTraitChunks[tier], selectedTraitIds)
            )}
          ></div>,
          <div key={`major-${tier}`} className={styles.traits.major}>
            {majorTraitChunks[tier].map(majorTrait => <Trait
              key={`major-${tier}-${majorTrait}`}
              id={majorTrait}
              className={cx(
                styles.traits.majorIcon,
                { [styles.traits.inactive]: !isTraitActive(majorTrait, selectedTraitIds) }
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
              mapTraitToFromMajor(majorTraitChunks[tier], selectedTraitIds),
              { [styles.connector.disabled]: tier === 2}
            )}
          ></div>
        ]))}
      </div>
    </Container>
  }
}
