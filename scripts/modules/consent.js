import { loadScript } from '../libs/dom'

const CONSENT_KEY = 'rfgames_consent_store'

const EVENT_NAME = 'tw.rfgames.consent.accept'

function onConsentAccepted(document) {
  document.dispatchEvent(new CustomEvent(EVENT_NAME, {
    value: true
  }))
}

function init(window, id) {
  const dnt = window.navigator.doNotTrack || window.doNotTrack || window.navigator.msDoNotTrack

  window.dataLayer = window.dataLayer || []

  window[`ga-disable-${id}`] = (dnt === '1' || dnt === 'yes')

  window.gtag = function () {
    window.dataLayer.push(arguments)
  }

  window.gtag('js', new Date())

  window.gtag('config', id, {
    anonymize_ip: true
  })
}

function bind(localStorage, consent) {
  if (localStorage && localStorage.getItem(CONSENT_KEY)) {
    onConsentAccepted(document)
  } else {
    consent
      .querySelectorAll('.consent-button')
      .forEach(button => {
        const click = event => {
          if (localStorage) {
            localStorage.setItem(CONSENT_KEY, btoa(JSON.stringify({
              value: true,
              timestamp: +new Date()
            })))
          }

          button.removeEventListener('click', click)
          consent.classList.add('is-disabled')
          onConsentAccepted(document)

          event.preventDefault()
        }

        button.addEventListener('click', click)
      })

    consent.classList.remove('is-disabled')
  }
}

export default function (window) {
  const {
    __shared_states__: {
      gtag: id
    },
    document,
    localStorage
  } = window

  const load = () => {
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${id}`)
    document.removeEventListener(EVENT_NAME, load)
  }

  init(window, id)

  document.addEventListener(EVENT_NAME, load)

  document
    .querySelectorAll('.consent')
    .forEach(bind.bind(null, localStorage))
}
