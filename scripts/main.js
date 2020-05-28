async function bootstrapModule(name, window) {
  try {
    const {
      default: bootstrap
    } = await import(`./modules/${name}`)

    bootstrap(window)
  } catch (error) {
    console.error(error.message)
  }
}

const bootstrap = () => {
  bootstrapModule('clipboard', window)
  bootstrapModule('consent', window)
  bootstrapModule('disqus', window)
  bootstrapModule('embed', window)
  bootstrapModule('form', window)
  bootstrapModule('image', window)
  bootstrapModule('selection', window)

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
