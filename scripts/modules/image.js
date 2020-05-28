function bind(image) {
  const load = () => {
    requestAnimationFrame(() => {
      image.removeEventListener('error', console.error)
      image.removeEventListener('load', load)
      image.classList.add('is-loaded')
    })
  }

  image.addEventListener('error', console.error)
  if (image.complete) {
    load()
  } else {
    image.addEventListener('load', load)
  }
}

export default function (window) {
  const {
    document
  } = window

  document
    .querySelectorAll('img[data-placeholder] ~ img')
    .forEach(bind.bind(null))
}
