import { loadScript } from '../libs'

declare global {
  interface Window {
    disqus_config:  (this: DisqusConfig) => void;
  }
}

type DisqusConfig = {
  page: {
    identifier?: string;
    title?: string;
    url?: string;
  }
}

type DisqusPage = {
  permalink?: string;
  title?: string;
  uniqueId?: string;
}

export type DisqusSharedStates = {
  disqus: string;
  page: DisqusPage;
}

export function bootstrap(window: Window): void {
  const {
    __shared_states__: sharedStates,
    document
  } = window

  const {
    disqus: id,
    page: {
      permalink,
      title,
      uniqueId
    }
  } = sharedStates as DisqusSharedStates

  window.disqus_config = function () {
    this.page.identifier = uniqueId
    this.page.title = title
    this.page.url = permalink
  }

  if (document.getElementById('disqus_thread')) {
    loadScript(window, `https://${id}.disqus.com/embed.js`)
  }
}
