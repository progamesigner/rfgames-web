function bind (toggler) {
  toggler.addEventListener('click', event => {
    toggler.classList.toggle('is-active')
    toggler
      .parentNode
      .parentNode
      .querySelectorAll('[data-menu]')
      .forEach(menu => {
        menu.classList.toggle('is-active')
      })
    event.preventDefault()
  })
}

export default function (window) {
  const {
    document
  } = window

  document
    .querySelectorAll('[data-toggler]')
    .forEach(bind.bind(null))
}
