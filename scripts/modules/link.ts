export default function (window: Window): void {
  const {
    document
  } = window

  document
    .querySelectorAll('a[href^="http"]')
    .forEach(element => {
      const url = element.getAttribute('href') || window.location.href

      element.addEventListener('click', event => {
        open(url, '_blank', 'noopener noreferrer')
        event.preventDefault()
      })
    })
}
