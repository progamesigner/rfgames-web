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

import {
  bindTooltipEvents,
  isTraitActive,
  mapSelectionToIds,
  TraitSelection
} from './lib'

import * as styles from './styles'

export { TraitMode, TraitPosition, TraitSelection } from './lib'

interface TraitLineAttributes extends
  m.Attributes,
  HasIDAttributes<number>,
  HasStoreAttributes,
  HasTooltipAttributes
{
  data: GW2Specialization;
  selectedTraits: Array<TraitSelection>;
}

function mapFromMajorClassName(
  traitIdsInTier: Array<number>,
  selectedTraitIds: Array<number>
): string | null {
  switch (traitIdsInTier.findIndex(id => selectedTraitIds.includes(id))) {
    case 0:
      return styles.connector.fromTop
    case 1:
      return styles.connector.fromMiddle
    case 2:
      return styles.connector.fromBottom
  }
  return null
}

function mapFromMinorClassName(
  traitIdsInTier: Array<number>,
  selectedTraitIds: Array<number>
): string | null {
  switch (traitIdsInTier.findIndex(id => selectedTraitIds.includes(id))) {
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
    const majorTraitChunks = chunk(3)(data.major_traits)
    const selectedTraitIds = mapSelectionToIds(data, selectedTraits)

    const tooltipEvents = !disableTooltip ?
      bindTooltipEvents(store, TooltipType.GW2_SPECIALIZATION, {
        specialization: data
      }) :
      {}

    return <Container
      className={cx(styles.root, { [styles.elite]: data.elite }, className)}
      inline={false}
      type="traitline"
      {...attrs}
    >
      <div
        className={cx(styles.background, styles.backgroundImage(data.background))}
      ></div>

      <div className={styles.specialization.root}>
        <div className={styles.specialization.hexagon} {...tooltipEvents}></div>
      </div>

      <div className={styles.traits.root}>
        {range(0, 3).map(tier => m.fragment({}, [
          <div key={`minor-${tier}`} className={styles.traits.minor}>
            <Trait
              id={data.minor_traits[tier]}
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
              mapFromMinorClassName(majorTraitChunks[tier], selectedTraitIds)
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
              mapFromMajorClassName(majorTraitChunks[tier], selectedTraitIds),
              { [styles.connector.disabled]: tier === 2}
            )}
          ></div>
        ]))}
      </div>
    </Container>
  }
}
