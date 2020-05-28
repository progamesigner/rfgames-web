import { request } from 'axios'

function onSubmitBegin(form) {
  form.querySelectorAll('button[type="submit"]').forEach(button => {
    button.classList.add('is-loading')
    button.classList.remove('is-danger')
    button.classList.remove('is-success')
  })
}

function onSubmitEnd(form, success) {
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

function bind(form, formatter) {
  form.addEventListener('submit', async event => {
    const data = formatter(new FormData(event.target))

    event.preventDefault()

    onSubmitBegin(form)
    try {
      const response = await request({
        url: form.action,
        method: form.method,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data,
        responseType: 'json'
      })

      if (response.status >= 200 && response.status < 300) {
        onSubmitEnd(form, true)
      } else {
        onSubmitEnd(form, false)
      }
    } catch (error) {
      onSubmitEnd(form, false)
      console.error(error)
    }
  })
}

export default function (window) {
  const {
    document
  } = window

  document
    .querySelectorAll('form[data-form="application"]')
    .forEach(form => bind(form, data => ({
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
    })))

  document
    .querySelectorAll('form[data-form="contact"]')
    .forEach(form => bind(form, data => ({
      name: data.get('name') || null,
      email: data.get('email') || null,
      message: data.get('message') || null
    })))
}
