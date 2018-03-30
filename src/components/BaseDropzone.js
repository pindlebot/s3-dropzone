import React from 'react'
import ReactDropzone from 'react-dropzone'
import createS3 from '../s3'

class BaseDropzone extends React.Component {

  constructor (props) {
    super(props)
   
    this.s3 = createS3(props)
  }

  loadPreview = async (key, file) => {
    const readAsDataURL = (file) => new Promise((resolve, reject) => {
      let reader  = new FileReader()

      reader.addEventListener('load', function () {
        resolve({ 
          src: reader.result,
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

    this.props.fileReaderOnLoad(preview)
  }

  createPresignedPost = (params) => new Promise((resolve, reject) => {
    if (!params.Bucket) {
      params.Bucket = this.props.bucketName
    }

    this.s3.createPresignedPost(params, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })

  handleError = (index) => {
    console.log('handleError')
    const uploads = [...this.props.store.get('uploads')]
    uploads[index] = {
      ...uploads[index],
      error: true
    }
    this.props.store.update('uploads', uploads)
  }

  onDrop = async (files) => {
    let errors = []
    let uploads = []
    let index = 0
    while (files.length > index) {
      let file = files.shift()
      let { type } = file
      let params = this.props.tap(file)
      await this.loadPreview(params.Fields.key, file)
      let payload
      try {
        payload = await this.createPresignedPost(
          params
        )
      } catch(err) {
        this.handleError(index)
      }

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
        uploads.push({ 
          ...upload,
          id: params.Fields.key,
          key: params.Fields.key
        })
      } catch (err) {
        errors.push({ error, key: params.Fields.key })
        this.handleError(index)
      }
      index++
    }
    this.props.onUploadFinish(errors, uploads)
  }

  render () {
    const {
      done,
      onDrop,
      requestParams,
      theme,
      onUploadFinish,
      fileReaderOnLoad,
      region,
      identityPoolId,
      bucketName,
      className: classNameProp,
      classes,
      tap,
      ...rest
    } = this.props
    const classNames = [classes.dropzone]
    if (classNameProp) {
      classNames.push(classNameProp)
    }
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
  onDrop: () => {},
  done: () => {},
  region: 'us-east-1',
  tap: file => ({
    Fields: {
      key: `${Math.round(Date.now() / 1000)}-${file.name}`,
      'Content-Type': file.type,
    }
  })
}

export default BaseDropzone