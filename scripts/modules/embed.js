import { loadScript } from '../libs/dom'

function init(window, cacheVersion) {
  const {
    document
  } = window

  document.GW2A_EMBED_OPTIONS = {
    forceCacheClearOnNextRun: cacheVersion,
    lang: 'en',
    persistToLocalStorage: true
  }
}

export default function (window) {
  init(window, '1')

  loadScript('https://unpkg.com/armory-embeds@0.4.3/armory-embeds.js')
}
