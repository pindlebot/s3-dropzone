export const loadPreview = ({ uploads, dispatch }) => async (key, file) => {
  const readAsDataURL = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('load', function () {
      resolve({
        data: reader.result,
        key: key,
        id: key,
        loading: true
      })
    }, false)

    if (file) {
      reader.readAsDataURL(file)
    }
  })

  const preview = await readAsDataURL(file)
  const _uploads = [...uploads]
  _uploads.unshift(preview)
  dispatch(() => ({ uploads: _uploads }))
}

export const createDropHandler = ({
  tap,
  uploads,
  requestParams,
  dispatch,
  client
}) => async files => {
  let errors = []
  let nextUploads = []
  let index = 0
  while (files.length > index) {
    let file = files.shift()
    let params = tap(file)
    let { Fields: { key } } = params
    await loadPreview({ dispatch, uploads })(key, file)
    let payload
    try {
      payload = await client.presign(params)
    } catch (error) {
      errors.push({ error, key })
    }
    try {
      let upload = await client.post(file, payload, requestParams)
      nextUploads.push({ ...upload, id: key, key: key })
    } catch (error) {
      errors.push({ error, key })
    }
    index++
  }
  return { uploads: nextUploads, errors }
}
