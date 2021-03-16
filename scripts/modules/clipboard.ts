import * as ClipboardJS from 'clipboard'

export function bootstrap(window: Window): void {
  const {
    document
  } = window

  const elements = document.querySelectorAll('[data-clipboard-text]')

  const clipboard = new ClipboardJS(elements, {
    text: button => button.getAttribute('data-clipboard-text') ?? ''
  })

  clipboard
    .on('success', event => {
      const message =
        event.trigger.getAttribute('data-clipboard-message') ??
        event.trigger.getAttribute('data-clipboard-text') ??
        null

      if (message) {
        alert(message)
      } else {
        alert(`Text Copied: ${message}`)
      }

      event.clearSelection()
    })
    .on('error', () => {
      alert('Your browser is not yet supported, please copy chat code manually.')
    })
}
