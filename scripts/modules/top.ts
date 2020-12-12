import { bindScrollEvent, currentScrollX, currentScrollY } from '../libs/dom'

export type TopSharedStates = {
  scrollTopDuration?: number;
  scrollTopOffset?: number;
}

function now(): number {
  return performance.now()
}

function easeInOutQuad(t: number, b: number, c: number, d: number): number {
  t /= d / 2
  if (t < 1) return c / 2 * t * t + b
  t--
  return -c / 2 * (t * (t - 2) - 1) + b
}

export function bootstrap(window: Window): void {
  const {
    document,
    __shared_states__: {
      scrollTopDuration,
      scrollTopOffset
    },
  } = window

  const buttons = document.querySelectorAll('.back-to-top')
  const duration = scrollTopDuration || 500
  const offset = scrollTopOffset || 300

  bindScrollEvent(window, (_, y) => {
    if (y > offset) {
      buttons.forEach(element => {
        element.classList.add('is-active')
      })
    } else {
      buttons.forEach(element => {
        element.classList.remove('is-active')
      })
    }
  })

  buttons.forEach(element => {
    element.addEventListener('click', event => {
      const d = duration
      const s = now()

      const loop = (time: number): void => {
        const px = currentScrollX()
        const py = currentScrollY()
        const elapsed = time - s

        window.scroll(px, easeInOutQuad(elapsed, py, -py, d))

        if (elapsed < d) {
          window.requestAnimationFrame(loop)
        } else {
          window.requestAnimationFrame(() => window.scroll(px, 0))
        }
      }

      window.requestAnimationFrame(loop)

      event.preventDefault()
    })
  })
}
