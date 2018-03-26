import React from 'react'
import ReactDropzone from 'react-dropzone'
import sheet from '../stylesheet'
import createS3 from '../s3'

class BaseDropzone extends React.Component {

  constructor (props) {
    super(props)
   
    this.s3 = createS3(props)
  }

  getPreview = async (files) => {
    const readAsDataURL = (file) => new Promise((resolve, reject) => {
      let reader  = new FileReader()

      reader.addEventListener('load', function () {
        resolve({ src: reader.result, loading: true })
      }, false)


      if (file) {
        reader.readAsDataURL(file)
      }
    })

    const previews = await Promise.all(files.map(file => readAsDataURL(file)))
    this.props.onAttachmentMount(previews)
  }

  createPresignedPost = (params) => new Promise((resolve, reject) => {
    if (!params.Bucket) {
      params.Bucket = this.props.bucketName
    }
    console.log({ params })
    this.s3.createPresignedPost(params, (err, data) => {
      if (err) console.error(err)
      resolve(data)
    })
  })

  onDrop = async (files) => {
    await this.getPreview(files)
    let error = []
    let uploads = []
    for (let file of files) {
      let { type } = file
      let params = this.props.interceptor(file)
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
      if (!error.length) error = null
      this.props.onUploadFinish(error, uploads)
    }
  }

  render () {
    const {
      done,
      onDrop,
      requestParams,
      getPayload,
      theme,
      onUploadFinish,
      onAttachmentMount,
      region,
      identityPoolId,
      bucketName,
      className: classNameProp,
      interceptor,
      ...rest
    } = this.props
    const classNames = ['s3-dropzone']
    if (classNameProp) {
      classNames.push(classNameProp)
    }
    console.log(this.s3)
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
  interceptor: file => ({
    Fields: {
      key: file.name,
      'Content-Type': file.type,
    }
  })
}

export default BaseDropzone