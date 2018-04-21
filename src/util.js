export async function loadPreview (key, file, store) {
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
  const uploads = [...store.get('uploads')]
  uploads.unshift(preview)
  store.update('uploads', uploads)
}

export async function handleDrop (props, client, files) {
  let errors = []
  let uploads = []
  let index = 0
  while (files.length > index) {
    let file = files.shift()
    let { type } = file
    let params = props.tap(file)
    let { Fields: { key } } = params
    await loadPreview(key, file, props.store)
    let payload
    try {
      payload = await client.presign(
        params
      )
    } catch (error) {
      errors.push({error, key})
    }
    try {
      let upload = await client.post(
        file,
        payload,
        props.requestParams
      )
      uploads.push({
        ...upload,
        id: key,
        key: key
      })
    } catch (error) {
      errors.push({ error, key })
    }
    index++
  }
  return { uploads, errors }
}