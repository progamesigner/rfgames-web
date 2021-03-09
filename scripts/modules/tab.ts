export function bootstrap(window: Window): void {
  const {
    document
  } = window

  document
    .querySelectorAll('.tabs')
    .forEach(element => {
      const navs = element.querySelectorAll('.tab-nav li')
      const tabs = element.querySelectorAll('.tab')

      element
        .querySelectorAll('.tab-nav a')
        .forEach((element, index) => {
          element.addEventListener('click', event => {
            navs.forEach(nav => {
              nav.classList.remove('is-active')
            })

            tabs.forEach(tab => {
              tab.classList.remove('is-active')
            })

            navs.item(index).classList.add('is-active')
            tabs.item(index).classList.add('is-active')

            event.preventDefault()
          })
        })
    })
}
