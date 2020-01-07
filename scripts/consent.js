const CONSENT_KEY = 'rfgames_consent_store'

const EVENT_NAME = 'tw.rfgames.consent.accept'

const emitAcceptEvent = () => {
  document.dispatchEvent(new CustomEvent(EVENT_NAME, {
    value: true
  }))
}

export function init (window) {
  const id = window.__shared_states__.gtag
  const dnt = (window.navigator.doNotTrack || window.doNotTrack || window.navigator.msDoNotTrack)

  const load = () => {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
    document.removeEventListener(EVENT_NAME, load)
    document.head.appendChild(script)
  }

  window.dataLayer = window.dataLayer || []

  window[`ga-disable-${id}`] = (dnt === '1' || dnt === 'yes')

  window.gtag = function () {
    window.dataLayer.push(arguments)
  }

  window.gtag('js', new Date())

  window.gtag('config', id, {
    anonymize_ip: true
  })

  document.addEventListener(EVENT_NAME, load)
}

export function bind (consent) {
  if (window.localStorage) {
    consent.querySelectorAll('.consent-button').forEach(button => {
      if (window.localStorage.getItem(CONSENT_KEY)) {
        emitAcceptEvent()
      } else {
        const click = event => {
          window.localStorage.setItem(CONSENT_KEY, btoa(JSON.stringify({
            value: true,
            timestamp: +new Date()
          })))
          button.removeEventListener('click', click)
          consent.classList.add('is-disabled')
          emitAcceptEvent()
          event.preventDefault()
        }

        button.addEventListener('click', click)
        consent.classList.remove('is-disabled')
      }
    })
  } else {
    emitAcceptEvent()
  }
}
