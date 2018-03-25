import React from 'react'
import ReactDropzone from 'react-dropzone'
import sheet from '../stylesheet'

class BaseDropzone extends React.Component {
  onDrop = async (files) => {
    this.props.onDrop(true)
    let error = []
    let uploads = []
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
      ...rest
    } = this.props
    return (
      <ReactDropzone className='s3-dropzone' onDrop={this.onDrop} {...rest} />
    )
  }
}

BaseDropzone.defaultProps = {
  requestParams: {},
  style: {
    backgroundColor: '#f7f7f7',
    boxShadow: 'inset 0 0 1px #ddd, 0 2px 4px #e6e6e6',
    transition: 'all 0.2s ease-in-out',
    padding: '4%',
    width: '60vw',
    height: '60vh'
  },
  onDrop: () => {},
  done: () => {}
}

export default BaseDropzone