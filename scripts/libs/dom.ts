export function loadScript(window: Window, url: string): void {
  const script = window.document.createElement('script')
  script.async = true
  script.src = url
  window.document.head.appendChild(script)
}
