async function initialize() {
  try {
    const {
      bootstrap
    } = await import(/* webpackChunkName: 'bootstrap' */ './bootstrap')
    bootstrap(window)
  } catch (error) {
    console.error(error.message)
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize)
} else {
  setTimeout(initialize, 1)
}
