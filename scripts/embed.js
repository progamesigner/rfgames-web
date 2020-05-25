export function init (window) {
  const load = () => {
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://unpkg.com/armory-embeds@0.4.3/armory-embeds.js'
    document.head.appendChild(script)
  }

  window.document.GW2A_EMBED_OPTIONS = {
    forceCacheClearOnNextRun: '1',
    lang: 'en',
    persistToLocalStorage: true
  }

  load()
}
