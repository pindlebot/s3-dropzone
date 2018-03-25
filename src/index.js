import React from 'react'
import Dropzone from 'react-dropzone'
import 'whatwg-fetch'
import sheet from './stylesheet'
import withStore from './store/withStore'
import SpinnerComponent from './components/SpinnerComponent'
import Button from './components/Button'
import Thumbnail from './components/Thumbnail'

class S3Dropzone extends React.Component {
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
    }
    if (!error.length) error = null
    this.props.onUpload(error, uploads)
    console.log('uploads', uploads)
    this.props.store.update('plant', { uploads, loading: false })
  }

  renderThumbnails = () => {
    const {
      uploads,
      thumbnail
    } = this.props
    return uploads.map((upload, i) =>
      <Thumbnail
        img={{...upload, ...Thumbnail.defaultProps.img}}
        figure={{
          width: `calc(${100 / uploads.length}% - 10px)`,
          margin: '0'
        }}
      />
    )
  }

  render () {
    const {
      uploads,
      loading,
      spinner,
      thumbnail,
      postParams,
      onUpload,
      getPayload,
      container,
      ...rest
    } = this.props
    console.log(this.props)
    const style = {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      height: '100%',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    }
    return (
      <Dropzone onDrop={this.onDrop} {...rest}>
        <div {...container}>
          {loading
            ? spinner
            : <div style={style}>{this.renderThumbnails()}</div>
          }
          <div style={{flexBasis: '20%'}}><Button /></div>
        </div>
      </Dropzone>
    )
  }
}

S3Dropzone.defaultProps = {
  postParams: {},
  style: {
    width: '50vw',
    height: '50vh',
    border: '2px dashed #ddd',
    backgroundColor: '#fafafa',
  },
  container: {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxSizing: 'border-box',
      padding: '40px',
    }
  },
  thumbnail: undefined,
  spinner: props => <SpinnerComponent />,
  loading: false,
  uploads: [],
  onUpload: () => {}
}

export default S3Dropzone
