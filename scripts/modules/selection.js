function bind (window, element) {
  element.addEventListener('click', () => {
    if (window.getSelection && window.document.createRange) {
      const selection = window.getSelection()
      const range = window.document.createRange()
      range.selectNodeContents(element)
      selection.addRange(range)
    }
  })
}
export default function (window) {
  const {
    document
  } = window

  document
    .querySelectorAll('[data-auto-selection]')
    .forEach(bind.bind(null, window))
}
