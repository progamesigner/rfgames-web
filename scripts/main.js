import onImageLoaded from './image'
import onFormSubmit from './form'

const bootstrap = () => {
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
    }), () => {
      form.querySelectorAll('button[type="submit"]').forEach(button => {
        button.classList.add('is-loading')
        button.classList.remove('is-danger')
        button.classList.remove('is-success')
      })
    }, success => {
      form.querySelectorAll('button[type="submit"]').forEach(button => {
        button.classList.add(success ? 'is-success' : 'is-danger')
        button.classList.remove('is-loading')
      })
    }))

  document
    .querySelectorAll('form[data-form="contact"]')
    .forEach(form => onFormSubmit(form, data => ({
      name: data.get('account') || null,
      email: data.get('discord') || null,
      message: data.get('message') || null
    }), () => {
      form.querySelectorAll('button[type="submit"]').forEach(button => {
        button.classList.add('is-loading')
        button.classList.remove('is-danger')
        button.classList.remove('is-success')
      })
    }, success => {
      form.querySelectorAll('button[type="submit"]').forEach(button => {
        button.classList.add(success ? 'is-success' : 'is-danger')
        button.classList.remove('is-loading')
      })
    }))

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
    .querySelectorAll('.modal-close')
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
