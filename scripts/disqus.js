export function init (window) {
  const id = window.__shared_states__.disqus

  const {
    permalink,
    title,
    uniqueId
  } = window.__shared_states__.page

  const load = () => {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://${id}.disqus.com/embed.js`
    document.head.appendChild(script)
  }

  window.disqus_config = function () {
    this.page.identifier = uniqueId
    this.page.title = title
    this.page.url = permalink
  }

  load()
}
