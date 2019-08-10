import { onLoaded as onImageLoaded } from './image'

const bootstrap = () => {
  document.querySelectorAll('img[data-placeholder] ~ img').forEach(async image => {
    try {
      const { classList } = await onImageLoaded(image)
      classList.add('is-loaded')
    } catch (error) {
      console.error(error)
    }
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap)
} else {
  setTimeout(bootstrap, 1)
}
