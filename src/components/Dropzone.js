import React from 'react'
import ReactDropzone from 'react-dropzone'

class Dropzone extends React.Component {

  state = {
    loading: false,
    uploads: []
  }

  componentDidMount = () => {
    if (!document.getElementById('spinnerStyles')) {
      let style = document.createElement('style')
      style.id = 'spinnerStyles'
      style.innerHTML = sheet
      document.querySelector('head').append(style)
    }
  }

  onDrop = async (files) => {
    this.props.store.update('plant', { loading: true })
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
          ...this.props.postParams
        })
        uploads.push({ upload, file })
      } catch (err) {
        error.push(err)
      }
      if (!error.length) error = null
      this.props.onUpload(error, uploads)
      console.log('uploads', uploads)
      this.props.store.update('plant', { uploads, loading: false })
    }
  }
  render () {
    return (
      <ReactDropzone onDrop={this.onDrop} {...this.props} />
    )
  }
}

Dropzone.defaultProps = {
  postParams: {},
  style: {
    width: '50vw',
    height: '50vh',
    backgroundColor: '#f7f7f7',
    boxShadow: 'inset 0 0 1px #ddd, 0 2px 4px #e6e6e6',
    transition: 'all 0.2s ease-in-out',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    padding: '40px'
  },
  loading: false,
  uploads: [],
  onUpload: () => {}
}

export default Dropzone