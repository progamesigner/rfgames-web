export function bootstrap(window: Window): void {
  const {
    document
  } = window

  document
    .querySelectorAll('.modal-background, .modal-close')
    .forEach(element => {
      element.addEventListener('click', event => {
        document
          .querySelectorAll('.modal.is-active')
          .forEach(modal => modal.classList.remove('is-active'))

        event.preventDefault()
      })
    })
}
