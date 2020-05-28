import { loadScript } from '../libs/dom'

function init(window) {
  const {
    __shared_states__: {
      page: {
        permalink,
        title,
        uniqueId
      }
    }
  } = window

  window.disqus_config = function () {
    this.page.identifier = uniqueId
    this.page.title = title
    this.page.url = permalink
  }
}

export default function (window) {
  const {
    __shared_states__: {
      disqus: id
    },
    document
  } = window

  init(window)

  if (document.getElementById('disqus_thread')) {
    loadScript(`https://${id}.disqus.com/embed.js`)
  }
}
