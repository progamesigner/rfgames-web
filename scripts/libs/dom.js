export const loadScript = src => {
  const script = document.createElement('script')
  script.async = true
  script.src = src
  document.head.appendChild(script)
}
