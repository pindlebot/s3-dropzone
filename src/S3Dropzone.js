import React from 'react'
import Thumbnail from './components/Thumbnail'
import Button from './components/Button'
import SpinnerComponent from './components/SpinnerComponent'
import Dropzone from './components/BaseDropzone';
import Uploads from './components/Uploads'
import * as theme from './theme'
import createS3 from './s3'
import Modal from './components/Modal'

class S3Dropzone extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      uploads: [],
      error: [],
      drag: false,
      view: undefined,
      modalOpen: true
    }

    this.s3 = createS3(props)
  }

  componentDidMount = () => {    
    if (this.props.uploads) {
      this.setState({ uploads: this.props.uploads })
    }

    setTimeout(() => { window.addEventListener('click', this.onWindowClick) })
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = () => {
    if (this.state.view) {
      this.setState({ view: undefined })
    } else {
      this.setState({ modalOpen: false })
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.uploads) {
      this.setState({ uploads: nextProps.uploads })
    }
  }

  handleDelete = (upload) => {
    console.log(this.state)
    const { bucketName } = this.props
    return this.s3.deleteObject({
      Bucket: bucketName,
      Key: upload.key || upload.src.replace(`https://s3.amazonaws.com/${bucketName}/`, '') 
    }).promise()
  }

  onClick = async (evt, type, index) => {
    let upload = this.state.uploads[index]
    evt.preventDefault()
    switch (type) {
      case 'delete':
        let uploads = [...this.state.uploads]
        uploads.splice(index, 1)
        this.setState({ uploads })
        await this.handleDelete(upload)
        break
      case 'view':
        this.setState({ view: upload })
        break
      case 'close':
        this.setState({ view: undefined })
        break
      case 'insert':
      default:
    }
    this.props.onClick(evt, type, upload)
  }

  fileReaderOnLoad = (previews) => {
    const uploads = previews.concat([...this.state.uploads])
    this.setState({ uploads, drag: false }, () => {
      this.props.onDrop(previews)
    })
  }

  onUploadFinish = (error, uploads) => {
    console.log({ error, uploads })
    this.setState({ 
      uploads: [...this.state.uploads]
        .map(u => ({ ...u, loading: false })),
      error: error
    }, () => {
      this.props.done(error, uploads)
    })
  }

  onDragStart = (evt) => {
    this.setState({ drag: true })
  }

  onDragEnd = () => {
    this.setState({ drag: false })
  }

  renderUploads = () => {
    return (
      <Uploads 
        {...this.props}
        onClick={this.onClick}
        uploads={this.state.uploads}
        drag={this.state.drag}
        view={this.state.view}
      />
    )
  }

  render() {
    const {
      thumbnailsContainer,
      done,
      spinner,
      uploads,
      theme,
      onClick,
      ...rest
    } = this.props
    const { loading, modalOpen } = this.state
    if (!modalOpen) return false
    const dropzoneContentStyles = {
      ...theme.content
    }
    if (this.state.drag) {
      dropzoneContentStyles.border = 0;
    }
    if (this.state.view) {
      return this.renderUploads()
    }
    return (
      <Modal {...this.props}>
        <Dropzone
          {...rest}
          onDragEnter={this.onDragStart}
          onDragLeave={this.onDragEnd}
          className={this.state.drag ? 'drag' : undefined}
          draggable='true'
          theme={theme}
          fileReaderOnLoad={this.fileReaderOnLoad}
          onUploadFinish={this.onUploadFinish}
          >
          <div
            className='s3-dropzone-content'
            style={dropzoneContentStyles}>
            {this.renderUploads()}
          </div>
        </Dropzone>
      </Modal>
    )
  }
}

S3Dropzone.defaultProps = {
  done: () => {},
  onDrop: () => {},
  theme: theme.keys,
  classes: theme.classes,
  onClick: () => {}
}

export default S3Dropzone