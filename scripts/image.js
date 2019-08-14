export async function onLoaded (image) {
  return new Promise((resolve, reject) => {
    image.addEventListener('error', reject)

    if (image.complete) {
      resolve(image)
    } else {
      image.addEventListener('load', () => resolve(image))
    }
  })
}

export default function bind (image, callback) {
  onLoaded(image).then(callback).catch(console.error)
}
