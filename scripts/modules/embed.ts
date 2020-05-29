import { loadScript } from '../libs'

declare global {
  interface Document {
    GW2A_EMBED_OPTIONS: {
      forceCacheClearOnNextRun: string;
      lang: string;
      persistToLocalStorage: boolean;
    }
  }
}

export default function (window: Window): void {
  const {
    document
  } = window

  const cacheVersion = '1'

  document.GW2A_EMBED_OPTIONS = {
    forceCacheClearOnNextRun: cacheVersion,
    lang: 'en',
    persistToLocalStorage: true
  }

  loadScript(window, 'https://unpkg.com/armory-embeds@0.4.3/armory-embeds.js')
}
