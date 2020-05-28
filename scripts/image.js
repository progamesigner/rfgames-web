export async function onLoaded (image) {
  return new Promise((resolve, reject) => {
    const load = () => {
      image.removeEventListener('error', reject)
      image.removeEventListener('load', load)
      resolve(image)
    }

    image.addEventListener('error', reject)
    if (image.complete) {
      resolve(image)
    } else {
      image.addEventListener('load', load)
    }
  })
}

export function bind (image, callback) {
  onLoaded(image).then(image => callback.call(image)).catch(console.error)
}
