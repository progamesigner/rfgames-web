import * as ClipboardJS from 'clipboard'

async function bootstrapModule(name, window) {
  try {
    const {
      default: bootstrap
    } = await import(`./modules/${name}`)

    bootstrap(window)
  } catch (error) {
    console.error(`Cannot load module: ${name}, because ${error.message}`)
  }
}

const bootstrap = () => {
  bootstrapModule('consent', window)
  bootstrapModule('disqus', window)
  bootstrapModule('embed', window)
  bootstrapModule('form', window)
  bootstrapModule('image', window)

  const clipboard = new ClipboardJS('[data-chat-code-copy]', {
    text: button => button.getAttribute('data-chat-code-copy')
  })

  clipboard
    .on('success', event => {
      alert(`Chat Code Copied: ${event.trigger.getAttribute('data-chat-code-copy')}`)

      event.clearSelection()
    })
    .on('error', () => {
      alert('Your browser is not yet supported, please copy chat code manually.')
    })

  document
    .querySelectorAll('[data-chat-code-selection]')
    .forEach(target => {
      target.addEventListener('click', () => {
        if (window.getSelection && window.document.createRange) {
          const selection = window.getSelection()
          const range = window.document.createRange()
          range.selectNodeContents(target)
          selection.addRange(range)
        }
      })
    })

  document
    .querySelectorAll('[data-toggler]')
    .forEach(toggler => {
      toggler.addEventListener('click', event => {
        toggler.classList.toggle('is-active')
        toggler.parentNode.parentNode.querySelectorAll('[data-menu]').forEach(menu => {
          menu.classList.toggle('is-active')
        })
        event.preventDefault()
      })
    })

  document
    .querySelectorAll('a[href^="http"]')
    .forEach(link => {
      link.addEventListener('click', event => {
        open(link.getAttribute('href'), '_blank', 'noopener')
        event.preventDefault()
      })
    })

  document
    .querySelectorAll('.modal-background, .modal-close')
    .forEach(button => {
      button.addEventListener('click', event => {
        document
          .querySelectorAll('.modal.is-active')
          .forEach(modal => {
            modal.classList.remove('is-active')
          })

        event.preventDefault()
      })
    })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap)
} else {
  setTimeout(bootstrap, 1)
}
