export function encode (bytes) {
  return `[&${btoa(String.fromCharCode(...bytes))}]`
}

export function bind (container) {
  const code = encode(container.getAttribute('data-chat-code').split(','))

  document
    .querySelectorAll('[data-chat-code-target]')
    .forEach(target => {
      target.addEventListener('click', () => {
        if (window.getSelection && window.document.createRange) {
          const selection = window.getSelection()
          const range = window.document.createRange()
          range.selectNodeContents(target)
          selection.addRange(range)
        }
      })

      target.innerHTML = code
    })

  document
    .querySelectorAll('[data-chat-code-copy]')
    .forEach(button => {
      button.addEventListener('click', event => {
        if (window.navigator && window.navigator.clipboard) {
          window.navigator.clipboard.writeText(code).then(() => {
            alert(`Chat Code Copied: ${code}`)
          }).catch()
        } else {
          alert('Your browser is not yet supported, please copy chat code manually.')
        }

        event.preventDefault()
      })
    })
}
