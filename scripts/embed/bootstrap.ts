import { random } from 'lodash/fp'
import { mount } from 'mithril'

import { apis } from './apis'
import {
  forceClearCacheOnNextLoad,
  initializeLocalStorage,
  makeAttributeName,
  makeClassName
} from './libs'
import { getStore } from './store'
import { EmbedStore } from './types'

const tooltipContainerId = makeClassName(`tooltip-${random(1000)(9999)}`)

async function bootstrapCache(): Promise<void> {
  const {
    id
  } = await apis.fetchGW2Build()
  initializeLocalStorage(id)
}

function bootstrapEmbeds(
  window: Window,
  store: EmbedStore
): Array<Promise<void>> {
  const {
    document
  } = window

  const typeName = makeAttributeName('type')

  if (!document.body) {
    throw new Error('Document body is not ready!')
  }

  return Array
    .from(document.body.querySelectorAll(`[${typeName}]`))
    .map(async element => {
      const type = element.getAttribute(typeName)

      // @note: remove the attribute to avoid double bootstraped embeds
      element.removeAttribute(typeName)

      if (type) {
        const {
          create
        } = await import(/* webpackMode: 'lazy-once' */ `./creators/${type}`)
        mount(element, create(store, element))
      }
    })
}

async function bootstrapTooltip(
  window: Window,
  store: EmbedStore
): Promise<void> {
  const {
    document
  } = window

  let container = document.getElementById(tooltipContainerId)

  const {
    create
  } = await import(/* webpackChunkName: 'tooltip' */ `./creators/tooltip`)

  if (!document.body) {
    throw new Error('Document body is not ready!')
  }

  if (!container) {
    container = document.createElement('div')
    container.id = tooltipContainerId
    document.body.appendChild(container)
  }

  mount(container, create(store, window))

  return Promise.resolve()
}

export async function bootstrap(window: Window): Promise<Array<void>> {
  const store = getStore(window)

  const {
    cacheVersion
  } = store.getState()

  forceClearCacheOnNextLoad(cacheVersion || '')

  return Promise
    .all([
      bootstrapCache(),
      ...bootstrapEmbeds(window, store),
      bootstrapTooltip(window, store)
    ])
    .catch(error => {
      console.error(error)
      return []
    })
}
