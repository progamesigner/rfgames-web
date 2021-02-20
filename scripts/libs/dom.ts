import { debounce, throttle } from 'throttle-debounce'

type ScrollEventCallback = (x: number, y: number) => void

export type UnbindEventListener = () => void

let scrollEventInstalled = false
let scrollEventCallbacks = [] as Array<ScrollEventCallback>

export function currentScrollX(): number {
  return window.scrollX || window.pageXOffset || 0
}

export function currentScrollY(): number {
  return window.scrollY || window.pageYOffset || 0
}

export function bindEventListener(
  element: Document | Element | Window,
  event: string,
  listener: EventListener
): UnbindEventListener {
  element.addEventListener(event, listener, false)
  return (): void => element.removeEventListener(event, listener, false)
}

export function bindScrollEvent(
  window: Window,
  callback: ScrollEventCallback
): void {
  scrollEventCallbacks = [...scrollEventCallbacks, callback]

  if (!scrollEventInstalled) {
    const onScrollEvent = () => {
        const x = currentScrollX()
        const y = currentScrollY()
        scrollEventCallbacks.forEach(callback => callback(x, y))
    }

    window.addEventListener('scroll', throttle(100, onScrollEvent))
    window.addEventListener('resize', debounce(50, onScrollEvent))
    window.addEventListener('orientationchange', debounce(50, onScrollEvent))

    scrollEventInstalled = true
  }

  callback(currentScrollX(), currentScrollY())
}

export function loadScript(window: Window, url: string): void {
  const script = window.document.createElement('script')
  script.async = true
  script.src = url
  window.document.head.appendChild(script)
}
