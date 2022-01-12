async function initialize() {
  try {
    const {
      bootstrap
    } = await import(/* webpackChunkName: 'bootstrap' */ './bootstrap')
    bootstrap(window)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize)
} else {
  setTimeout(initialize, 1)
}
