import React from 'react'
import ReactDropzone from 'react-dropzone'
import sheet from '../stylesheet'

class BaseDropzone extends React.Component {

  getPreview = async (files) => {
    const readAsDataURL = (file) => new Promise((resolve, reject) => {
      let reader  = new FileReader()

      reader.addEventListener('load', function () {
        resolve({ src: reader.result, placeholder: true })
      }, false)


      if (file) {
        reader.readAsDataURL(file)
      }
    })

    const previews = await Promise.all(files.map(file => readAsDataURL(file)))
    this.props.onAttachmentMount(previews)
  }

  onDrop = async (files) => {
    console.log(files)
    await this.getPreview(files)
    let error = []
    let uploads = []
    //
    return
    for (let file of files) {
      let payload = await this.props.getPayload(file)
      let formData = new window.FormData()
      for (let field in payload.fields) {
        formData.append(field, payload.fields[field])
      }
      formData.append('file', file)
      try {
        let upload = await fetch(payload.url, {
          method: 'POST',
          body: formData,
          ...this.props.requestParams
        })
        uploads.push({ upload, file })
      } catch (err) {
        error.push(err)
      }
      if (!error.length) error = null
      this.props.done(error, uploads)
    }
  }

  render () {
    const {
      done,
      onDrop,
      requestParams,
      getPayload,
      className: classNameProp,
      theme,
      onAttachmentMount,
      ...rest
    } = this.props
    const classNames = ['s3-dropzone']
    if (classNameProp) {
      classNames.push(classNameProp)
    }
    console.log('dropzone-props', this.props)
    return (
      <ReactDropzone 
       className={classNames.join(' ')} 
       onDrop={this.onDrop} 
       style={theme.dropzone}
       {...rest}
      />
    )
  }
}

BaseDropzone.defaultProps = {
  requestParams: {},
  // onDrop: () => {},
  done: () => {}
}

export default BaseDropzone