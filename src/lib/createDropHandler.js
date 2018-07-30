const readAsDataURL = (key, file) =>
  new Promise((resolve, reject) => {
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

const createPreviews = (files, {
  uploads,
  mapFileToParams,
  dispatch
}) => {
  let copy = [...uploads]
  const createPreview = file => {
    let params = mapFileToParams(file)
    let { Fields: { key } } = params
    return readAsDataURL(key, file)
      .then(result => {
        copy.unshift(result)
        return [file, params]
      })
  }

  return Promise.all(files.map(createPreview))
    .then(result => {
      dispatch(() => ({ uploads: copy }))
      return result
    })
}

export const createDropHandler = ({
  mapFileToParams,
  uploads,
  requestParams,
  dispatch,
  client
}) => async files => {
  let previews = await createPreviews(files, {
    uploads,
    mapFileToParams,
    dispatch
  })
  let errors = []
  let nextUploads = []

  while (previews.length) {
    let [file, params] = previews.shift()
    let { Fields: { key } } = params
    let payload
    try {
      payload = await client.presign(params)
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(error)
      }
      errors.push({ error, key })
    }

    try {
      let upload = await client.post(file, payload, requestParams)
      nextUploads.push({ ...upload, id: key, key: key })
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(error)
      }
      errors.push({ error, key })
    }
  }

  return { uploads: nextUploads, errors }
}

export default createDropHandler
