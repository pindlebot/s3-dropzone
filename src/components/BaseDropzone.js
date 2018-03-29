import React from 'react'
import ReactDropzone from 'react-dropzone'
import createS3 from '../s3'

class BaseDropzone extends React.Component {

  constructor (props) {
    super(props)
   
    this.s3 = createS3(props)
  }

  loadPreviews = async (files) => {
    const readAsDataURL = (file) => new Promise((resolve, reject) => {
      let reader  = new FileReader()

      reader.addEventListener('load', function () {
        resolve({ src: reader.result, loading: true })
      }, false)


      if (file) {
        reader.readAsDataURL(file)
      }
    })

    const previews = await Promise.all(
      files.map(file => readAsDataURL(file))
    )
    this.props.fileReaderOnLoad(previews)
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

  onDrop = async (files) => {
    await this.loadPreviews(files)
    let error = []
    let uploads = []
    for (let file of files) {
      let { type } = file
      let params = this.props.tap(file)
      let payload = await this.createPresignedPost(
        params
      )
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
        uploads.push({ ...upload, key: params.Fields.key })
      } catch (err) {
        error.push(err)
      }
    }
    if (!error.length) error = null
    this.props.onUploadFinish(error, uploads)
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
      key: file.name,
      'Content-Type': file.type,
    }
  })
}

export default BaseDropzone