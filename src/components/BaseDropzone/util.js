export function loadPreview (key, file) {
  const readAsDataURL = (file) => new Promise((resolve, reject) => {
    const reader  = new FileReader()
    reader.addEventListener('load', function() {
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

  return readAsDataURL(file)
}


