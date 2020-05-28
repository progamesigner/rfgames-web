async function bootstrapModule(name, window) {
  try {
    const {
      default: bootstrap
    } = await import(`./modules/${name}`)

    bootstrap(window)
  } catch (error) {
    console.error(error.message)
  }
}

const bootstrap = () => {
  bootstrapModule('clipboard', window)
  bootstrapModule('consent', window)
  bootstrapModule('disqus', window)
  bootstrapModule('embed', window)
  bootstrapModule('form', window)
  bootstrapModule('image', window)
  bootstrapModule('link', window)
  bootstrapModule('modal', window)
  bootstrapModule('selection', window)
  bootstrapModule('toggler', window)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap)
} else {
  setTimeout(bootstrap, 1)
}
