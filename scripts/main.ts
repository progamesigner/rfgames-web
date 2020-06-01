async function init() {
  try {
    const {
      default: bootstrap
    } = await import(/* webpackChunkName: 'bootstrap' */ './bootstrap')
    bootstrap(window)
  } catch (error) {
    console.error(error.message)
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  setTimeout(init, 1)
}
