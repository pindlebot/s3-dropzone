const readAsDataURL = (key, file) =>
  new Promise((resolve, reject) => {
    const reader = new window.FileReader()
    reader.addEventListener('load', () => {
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
  setUploads
}) => {
  const copy = [...uploads]
  const createPreview = file => {
    const params = mapFileToParams(file)
    const { Fields: { key } } = params
    return readAsDataURL(key, file)
      .then(result => {
        copy.unshift(result)
        return [file, params]
      })
  }

  return Promise.all(files.map(createPreview))
    .then(result => {
      setUploads(copy)
      return result
    })
}

export function createDropHandler ({
  mapFileToParams,
  uploads,
  requestParams,
  setUploads,
  client
}) {
  return async function (files) {
    const previews = await createPreviews(files, {
      uploads,
      mapFileToParams,
      setUploads
    })
    const errors = []
    const nextUploads = []
  
    while (previews.length) {
      const [file, params] = previews.shift()
      const { Fields: { key } } = params
      let payload
      try {
        payload = await client.presign(params)
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(error)
        }
        errors.push({ error, key })
        continue
      }
  
      try {
        const upload = await client.post(file, payload, requestParams)
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
}

export default createDropHandler
