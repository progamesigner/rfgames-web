import { bind as onFormSubmit } from './form'
import { bind as onImageLoaded } from './image'

import * as ClipboardJS from 'clipboard'

function onFormSubmitBegin (form) {
  return () => {
    form.querySelectorAll('button[type="submit"]').forEach(button => {
      button.classList.add('is-loading')
      button.classList.remove('is-danger')
      button.classList.remove('is-success')
    })
  }
}

function onFormSubmitEnd (form) {
  return success => {
    form.querySelectorAll('button[type="submit"]').forEach(button => {
      button.classList.add(success ? 'is-success' : 'is-danger')
      button.classList.remove('is-loading')
    })

    form.querySelectorAll('.modal').forEach(modal => {
      modal.classList.add('is-active')

      modal.querySelectorAll('[data-failure-message], [data-success-message').forEach(content => {
        content.classList.remove('is-active')
      })

      modal.querySelectorAll(`[data-${success ? 'success' : 'failure'}-message`).forEach(content => {
        content.classList.add('is-active')
      })
    })
  }
}

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
    .querySelectorAll('form[data-form="application"]')
    .forEach(form => onFormSubmit(form, data => ({
      account: data.get('account') || null,
      discord: data.get('discord') || null,
      age: data.get('age') === 'true',
      goals: data.get('goals') === 'true',
      times: data.get('times') === 'true',
      microphone: data.get('microphone') === 'true',
      commands: data.get('commands') === 'true',
      main: data.get('main').toLowerCase(),
      alt: data.get('alt').toLowerCase(),
      message: data.get('message') || null
    }), onFormSubmitBegin(form), onFormSubmitEnd(form)))

  document
    .querySelectorAll('form[data-form="contact"]')
    .forEach(form => onFormSubmit(form, data => ({
      name: data.get('name') || null,
      email: data.get('email') || null,
      message: data.get('message') || null
    }), onFormSubmitBegin(form), onFormSubmitEnd(form)))

  document
    .querySelectorAll('img[data-placeholder] ~ img')
    .forEach(image => onImageLoaded(image, () => {
      image.classList.add('is-loaded')
    }))

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
