import { EmbedOptions } from '../embed/types'

declare global {
  interface Window {
    GW2_EMBED_OPTIONS?: Partial<EmbedOptions>;
  }
}

async function initialize(window: Window): Promise<void> {
  try {
    const {
      bootstrap
    } = await import(/* webpackChunkName: 'embed-bootstrap' */ `../embed/bootstrap`)
    bootstrap(window)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }
  }
}

export function bootstrap(window: Window): void {
  const {
    document
  } = window

  if (document.querySelectorAll('[data-embed-type]')) {
    initialize(window)
  }
}
