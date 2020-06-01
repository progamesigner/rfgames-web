import { bindEventListener, loadScript } from '../libs'

type GAData = string | Date | GADataConfig;

type GADataConfig = {
  anonymize_ip: boolean;
};

declare global {
  interface Window {
    gtag: (...arguments: Array<GAData>) => void;
    dataLayer: Array<GAData>;
    [key: string]: boolean;
  }

  interface Navigator {
    msDoNotTrack: string | null;
  }
}

const CONSENT_KEY = 'rfgames_consent_store'

const EVENT_NAME = 'tw.rfgames.consent.accept'

function onConsentAccepted(document: Document) {
  const event = new CustomEvent(EVENT_NAME)

  document.dispatchEvent(event)
}

export interface ConsentSharedStates {
  gtag: string;
}

export default function (window: Window): void {
  const {
    __shared_states__: sharedStates,
    document,
    localStorage
  } = window

  const {
    gtag: id
  } = sharedStates as ConsentSharedStates

  const dnt =
    window.navigator.doNotTrack ||
    window.doNotTrack ||
    window.navigator.msDoNotTrack ||
    false

  const unbindEvent = bindEventListener(document, EVENT_NAME, () => {
    loadScript(window, `https://www.googletagmanager.com/gtag/js?id=${id}`)
    unbindEvent()
  })

  window.dataLayer = window.dataLayer || []

  window[`ga-disable-${id}`] = (dnt === '1' || dnt === 'yes')

  window.gtag = function (...args) {
    window.dataLayer.push(...args)
  }

  window.gtag('js', new Date())

  window.gtag('config', id, {
    anonymize_ip: true
  })

  document
    .querySelectorAll('.consent')
    .forEach(element => {
      if (localStorage && localStorage.getItem(CONSENT_KEY)) {
        onConsentAccepted(document)
      } else {
        element
          .querySelectorAll('.consent-button')
          .forEach(button => {
            const unbindEvent = bindEventListener(button, 'click', event => {
              if (localStorage) {
                localStorage.setItem(CONSENT_KEY, btoa(JSON.stringify({
                  timestamp: +new Date()
                })))
              }

              unbindEvent()

              element.classList.add('is-disabled')
              onConsentAccepted(document)

              event.preventDefault()
            })
          })

          element.classList.remove('is-disabled')
      }
    })
}
