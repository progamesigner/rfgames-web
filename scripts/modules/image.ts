export function bootstrap(window: Window): void {
  const {
    document
  } = window

  document
    .querySelectorAll('img[data-placeholder] ~ img')
    .forEach(element => {
      const image = element as HTMLImageElement

      const load = () => window.requestAnimationFrame(() => {
        image.removeEventListener('load', load)
        image.classList.add('is-loaded')
      })

      image.addEventListener('error', console.error)
      if (image.complete) {
        load()
      } else {
        image.addEventListener('load', load)
      }
    })
}
