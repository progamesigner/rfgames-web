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
  id?: string;
  permalink?: string;
  title?: string;
}

export type DisqusSharedStates = {
  disqus: string;
  page: DisqusPage;
}

export function bootstrap(window: Window): void {
  const {
    __shared_states__: {
      disqus,
      page: {
        id,
        permalink,
        title
      }
    },
    document
  } = window

  window.disqus_config = function () {
    this.page.identifier = id
    this.page.title = title
    this.page.url = permalink
  }

  if (document.getElementById('disqus_thread')) {
    loadScript(window, `https://${disqus}.disqus.com/embed.js`)
  }
}
