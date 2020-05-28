function bind(document, button) {
  button.addEventListener('click', event => {
    document
      .querySelectorAll('.modal.is-active')
      .forEach(modal => {
        modal.classList.remove('is-active')
      })

    event.preventDefault()
  })
}

export default function (window) {
  const {
    document
  } = window

  document
    .querySelectorAll('.modal-background, .modal-close')
    .forEach(bind.bind(null, document))
}
