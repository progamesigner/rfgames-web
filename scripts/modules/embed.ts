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

export function bootstrap(window: Window): void {
  const {
    document
  } = window

  document.GW2A_EMBED_OPTIONS = {
    forceCacheClearOnNextRun: '1',
    lang: 'en',
    persistToLocalStorage: true
  }

  loadScript(window, 'https://unpkg.com/armory-embeds@0.4.3/armory-embeds.js')
}
