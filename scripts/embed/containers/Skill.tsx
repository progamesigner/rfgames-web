import * as m from 'mithril'

import { fetchSkill, fetchSpecialization } from '../actions'
import { Empty, Loader, Skill } from '../components'
import {
  GW2Resources,
  HasEmptyTextAttributes,
  HasIDAttributes,
  HasStoreAttributes
} from '../types'

import {
  isFetchFinished,
  mapActiveTraitlinesToTraitIds,
  TraitSelection,
  wrapAsyncAction
} from './libs'

interface SkillContainerAttributes extends
  m.Attributes,
  HasEmptyTextAttributes,
  HasIDAttributes<number>,
  HasStoreAttributes
{
  activeTraitlines?: Record<number, ReadonlyArray<TraitSelection>>;
}

const fetch = wrapAsyncAction(fetchSkill)
const fetchSpec = wrapAsyncAction(fetchSpecialization)

export class SkillContainer implements m.Component<SkillContainerAttributes> {
  public oninit({ attrs }: m.Vnode<SkillContainerAttributes>): void {
    const {
      activeTraitlines,
      store,
      id
    } = attrs
    fetch(store, id)
    if (activeTraitlines) {
      Object
        .keys(activeTraitlines)
        .map(parseInt)
        .map(fetchSpec.bind(null, store))
    }
  }

  public view({
    attrs: {
      activeTraitlines,
      id,
      overrideEmptyText,
      store,
      ...attrs
    }
  }: m.Vnode<SkillContainerAttributes>): m.Children {
    const {
      [GW2Resources.SKILLS]: skills,
      [GW2Resources.SPECIALIZATIONS]: specializations
    } = store.getState()

    if (id > 0 && skills) {
      const skill = skills[id]

      const activeTraits = specializations ?
        mapActiveTraitlinesToTraitIds(specializations, activeTraitlines) :
        []

      if (skill && isFetchFinished(skill.state)) {
        return <Skill
          activeTraits={activeTraits}
          skill={skill.data}
          store={store}
          {...attrs}
        />
      }

      return <Loader type="skill" {...attrs} />
    }

    return <Empty
      overrideEmptyText={overrideEmptyText}
      store={store}
      type="skill"
      {...attrs}
    />
  }
}
