import React from 'react'
import ReactDropzone from 'react-dropzone'
import createClient from '../../createClient'
import classNames from 'classnames'
import * as util from './util'

class BaseDropzone extends React.Component {

  constructor (props) {
    super(props)
   
    this.client = createClient(props)
  }

  loadPreview = async (key, file) => {
    const readAsDataURL = (file) => new Promise((resolve, reject) => {
      let reader  = new FileReader()

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

    this.props.fileReaderOnLoad(preview)
  }

  handleError = (index) => {
    const uploads = [...this.props.uploads]
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
      let params, { Fields: { key } } = this.props.tap(file)
      let preview = await util.loadPreview(key, file)
      this.props.fileReaderOnLoad(preview)
      let payload
      try {
        payload = await this.client.presign(
          params
        )
      } catch(err) {
        this.handleError(index)
      }
      try {
        let upload = await this.client.post(
          file,
          payload,
          this.props.requestParams
        )
        uploads.push({
          ...upload,
          id: key,
          key: key
        })
      } catch (err) {
        errors.push({ error, key })
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
      uploads,
      ...rest
    } = this.props
  
    const className = classNames(
      classes.dropzone,
      classNameProp
    )
    return (
      <ReactDropzone 
       className={className} 
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