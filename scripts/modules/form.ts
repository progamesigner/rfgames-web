import { request } from 'mithril'

type ApplicationFormData = {
  account: string | null;
  age: boolean;
  alt: string;
  commands: boolean;
  discord: string | null;
  goals: boolean;
  main: string;
  message: string | null;
  microphone: boolean;
  times: boolean;
}

type ContactFormData = {
  email: string | null;
  message: string | null;
  name: string | null;
}

type FormTransformer<T> = (data: FormData) => T

function formApplicationTransformer(data: FormData): ApplicationFormData {
  const account = data.get('account') as string | null
  const alt = data.get('alt') as string | null
  const discord = data.get('discord') as string | null
  const main = data.get('main') as string | null
  const message = data.get('message') as string | null

  return {
    account: account ?? null,
    age: data.get('age') === 'true',
    alt: alt ? alt.toLowerCase() : '',
    commands: data.get('commands') === 'true',
    discord: discord ?? null,
    goals: data.get('goals') === 'true',
    main: main ? main.toLowerCase() : '',
    message: message ?? null,
    microphone: data.get('microphone') === 'true',
    times: data.get('times') === 'true'
  }
}

function formContactTransformer(data: FormData): ContactFormData {
  const email = data.get('email') as string | null
  const message = data.get('message') as string | null
  const name = data.get('name') as string | null

  return {
    email: email ?? null,
    message: message ?? null,
    name: name ?? null
  }
}

function onSubmitBegin(form: HTMLFormElement): void {
  form.querySelectorAll('button[type="submit"]').forEach(button => {
    button.classList.add('is-loading')
    button.classList.remove('is-danger')
    button.classList.remove('is-success')
  })
}

function onSubmitEnd(form: HTMLFormElement, success: boolean): void {
  form.querySelectorAll('button[type="submit"]').forEach(button => {
    button.classList.add(success ? 'is-success' : 'is-danger')
    button.classList.remove('is-loading')
  })

  form.querySelectorAll('.modal').forEach(modal => {
    modal.classList.add('is-active')

    modal
      .querySelectorAll('[data-failure-message], [data-success-message')
      .forEach(content => {
        content.classList.remove('is-active')
      })

    modal
      .querySelectorAll(`[data-${success ? 'success' : 'failure'}-message`)
      .forEach(content => {
        content.classList.add('is-active')
      })
  })
}

function bind<T>(form: HTMLFormElement, transformer: FormTransformer<T>) {
  form.addEventListener('submit', async event => {
    const body = transformer(new FormData(event.target as HTMLFormElement))

    event.preventDefault()

    onSubmitBegin(form)
    try {
      await request(form.getAttribute('action') ?? '', {
        method: form.getAttribute('method') ?? 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      })

      onSubmitEnd(form, true)
    } catch (error) {
      onSubmitEnd(form, false)
      console.error(error)
    }
  })
}

export function bootstrap(window: Window): void {
  const {
    document
  } = window

  document
    .querySelectorAll('form[data-form="application"]')
    .forEach(form => bind(form as HTMLFormElement, formApplicationTransformer))

  document
    .querySelectorAll('form[data-form="contact"]')
    .forEach(form => bind(form as HTMLFormElement, formContactTransformer))
}
