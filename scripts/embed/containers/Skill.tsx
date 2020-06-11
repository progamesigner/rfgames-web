import * as m from 'mithril'

import { fetchSkill } from '../actions'
import { Empty, Loader, Skill } from '../components'
import {
  GW2Resources,
  HasEmptyTextAttributes,
  HasIDAttributes,
  HasStoreAttributes
} from '../types'

import { isFetchFinished, wrapAsyncAction } from './helpers'

type SkillContainerAttributes =
  m.Attributes &
  HasEmptyTextAttributes &
  HasIDAttributes<number> &
  HasStoreAttributes

const fetch = wrapAsyncAction(fetchSkill)

export class SkillContainer implements m.Component<SkillContainerAttributes> {
  public oninit({ attrs }: m.Vnode<SkillContainerAttributes>): void {
    const {
      store,
      id
    } = attrs
    fetch(store, id)
  }

  public view({
    attrs: {
      id,
      overrideEmptyText,
      store,
      ...attrs
    }
  }: m.Vnode<SkillContainerAttributes>): m.Children {
    const {
      [GW2Resources.SKILL]: skills
    } = store.getState()

    if (id > 0 && skills) {
      const skill = skills[id]

      if (skill && isFetchFinished(skill.state)) {
        return <Skill
          skill={skill.data}
          store={store}
          {...attrs}
        />
      }

      return <Loader {...attrs} />
    }

    return <Empty
      overrideEmptyText={overrideEmptyText}
      store={store}
      {...attrs}
    />
  }
}
