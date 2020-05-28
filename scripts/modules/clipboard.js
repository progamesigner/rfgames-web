import * as ClipboardJS from 'clipboard'

export default function () {
  const clipboard = new ClipboardJS('[data-clipboard-text]', {
    text: button => button.getAttribute('data-clipboard-text')
  })

  clipboard
    .on('success', event => {
      const message = event.trigger.getAttribute('data-clipboard-message')

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
