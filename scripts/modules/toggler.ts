export default function (window: Window): void {
  const {
    document
  } = window

  document
    .querySelectorAll('[data-toggler]')
    .forEach(element => {
      element.addEventListener('click', event => {
        element.classList.toggle('is-active')

        if (element.parentNode && element.parentNode.parentNode) {
          element
            .parentNode
            .parentNode
            .querySelectorAll('[data-menu]')
            .forEach(menu => menu.classList.toggle('is-active'))
        }

        event.preventDefault()
      })
    })
}
