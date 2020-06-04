export type UnbindEventListener = () => void

export function bindEventListener(
  element: Document | Element | Window,
  event: string,
  listener: EventListener
): UnbindEventListener {
  element.addEventListener(event, listener, false)
  return (): void => element.removeEventListener(event, listener, false)
}

export function loadScript(window: Window, url: string): void {
  const script = window.document.createElement('script')
  script.async = true
  script.src = url
  window.document.head.appendChild(script)
}
