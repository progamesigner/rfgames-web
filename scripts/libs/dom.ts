export function bindEventListener(
  element: Document | Element,
  event: string,
  listener: EventListener
): () => void {
  element.addEventListener(event, listener, false)
  return (): void => element.removeEventListener(event, listener, false)
}

export function loadScript(window: Window, url: string): void {
  const script = window.document.createElement('script')
  script.async = true
  script.src = url
  window.document.head.appendChild(script)
}
