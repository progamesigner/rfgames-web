export default function (window: Window): void {
  const {
    document
  } = window

  document
    .querySelectorAll('[data-auto-selection]')
    .forEach(element => {
      element.addEventListener('click', () => {
        if (window.getSelection && window.document.createRange) {
          const selection = window.getSelection()
          const range = window.document.createRange()

          range.selectNodeContents(element)

          if (selection) {
            selection.addRange(range)
          }
        }
      })
    })
}
