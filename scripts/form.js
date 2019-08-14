import { request } from 'axios'

export default function (form, formatter, onBegin, onEnd) {
  form.addEventListener('submit', async event => {
    const data = formatter(new FormData(event.target))

    event.preventDefault()

    onBegin()
    try {
      const response = await request({
        url: form.action,
        method: form.method,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data,
        responseType: 'json'
      })

      if (response.status >= 200 && response.status < 300) {
        onEnd(true)
      } else {
        onEnd(false)
      }
    } catch (error) {
      onEnd(false)
      console.error(error)
    }
  })
}
