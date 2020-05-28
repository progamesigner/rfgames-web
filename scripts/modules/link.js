function bind (link) {
  link.addEventListener('click', event => {
    open(link.getAttribute('href'), '_blank', 'noopener')
    event.preventDefault()
  })
}

export default function (window) {
  const {
    document
  } = window

  document
    .querySelectorAll('a[href^="http"]')
    .forEach(bind.bind(null))
}
