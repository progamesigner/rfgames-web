import * as m from 'mithril'

import { fetchSkill } from '../actions'
import { Empty, Loader, Skill } from '../components'
import {
  GW2Resources,
  HasIDAttributes,
  HasRenderAttributes,
  HasStoreAttributes
} from '../types'

import { isFetchFinished, wrapAsyncAction } from './helpers'

type SkillContainerAttributes =
  m.Attributes &
  HasIDAttributes<number> &
  HasRenderAttributes &
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
      store,
      id,
      ...attrs
    }
  }: m.Vnode<SkillContainerAttributes>): m.Children {
    const {
      [GW2Resources.SKILL]: skills
    } = store.getState()

    if (id && skills && skills[id]) {
      if (isFetchFinished(skills[id].state) && skills[id].data) {
        return <Skill data={skills[id].data} store={store} {...attrs} />
      }

      return <Loader {...attrs} />
    }

    return <Empty type="skill" {...attrs} />
  }
}
