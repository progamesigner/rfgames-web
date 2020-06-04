import * as m from 'mithril'

import { fetchSkill } from '../actions'
import { Skill } from '../components'
import { HasIDAttributes, HasStoreAttributes } from '../types'

import { wrapAsyncAction } from './helpers'

type SkillContainerAttributes = m.Attributes & HasStoreAttributes & HasIDAttributes<number>

const fetch = wrapAsyncAction(fetchSkill)

export class SkillContainer implements m.Component<SkillContainerAttributes> {
  public oninit({ attrs }: m.Vnode<SkillContainerAttributes>): void {
    const {
      store,
      id
    } = attrs
    fetch(store, id)
  }

  public view({ attrs }: m.Vnode<SkillContainerAttributes>): m.Children {
    const {
      store,
      id
    } = attrs

    const {
      skills
    } = store.getState()

    if (id && skills && skills[id]) {
      return <Skill {...attrs} {...skills[id].data}></Skill>
    }

    return null
  }
}
