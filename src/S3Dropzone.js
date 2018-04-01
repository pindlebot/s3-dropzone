import React from 'react'
import Thumbnail from './components/Thumbnail'
import Button from './components/Button'
import Dropzone from './components/BaseDropzone';
import Grid from './components/Grid'
import * as theme from './theme'
import createClient from './createClient'
import Modal from './components/Modal'
import { withStore } from 'react-subscriptions'
import uniqBy from 'lodash.uniqby'

class S3Dropzone extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      drag: false,
      view: undefined,
      startIndex: 0
    }

    this.client = createClient(props)
  }

  componentDidMount = () => {
    setTimeout(() => { window.addEventListener('click', this.onWindowClick) })
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = (evt) => {
    if (this.state.view) {
      this.setState({ view: undefined })
    } else {
      this.props.store.update('visible', false)
      this.props.onClickAway(evt)
    }
  }

  handleDelete = (upload) => {
    const { bucketName } = this.props
    return this.s3.deleteObject({
      Bucket: bucketName,
      Key: upload.id || upload.key
    }).promise()
  }

  onClick = async (evt, type, index) => {
    let upload = {...this.props.uploads[index]}
    evt.preventDefault()
    switch (type) {
      case 'delete':
        if (!upload.error) {
          this.client.remove(upload.id || upload.key)
        }
        let uploads = [...this.props.uploads]
        uploads.splice(index, 1)
        this.props.store.update('uploads', uploads)
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

  fileReaderOnLoad = (preview) => {
    const uploads = [...this.props.uploads]
    uploads.unshift(preview)
    this.setState({ drag: false}, () => {
      this.props.store.update('uploads', uploads)
      this.props.onDrop(preview)
    })
  }

  onUploadFinish = (error, uploads) => {
    this.props.store.update('uploads',
       [...this.props.uploads].map(u => ({ ...u, loading: false })
      ),
    )
    this.props.done(error, uploads)
  }

  onDragStart = (evt) => {
    this.setState({ drag: true })
  }

  onDragEnd = (evt) => {
    this.setState({ drag: false })
  }

  renderGrid = () => {
    return (
      <Grid 
        {...this.props}
        onClick={this.onClick}
        uploads={this.props.uploads}
        drag={this.state.drag}
        view={this.state.view}
        startIndex={this.state.startIndex}
      />
    )
  }

  render() {
    const {
      thumbnailsContainer,
      done,
      theme,
      onClick,
      onClickAway,
      store,
      visible,
      uploads,
      ...rest
    } = this.props

    if (!visible) return false
    const dropzoneContentStyles = {
      ...theme.content
    }
    if (this.state.drag) {
      dropzoneContentStyles.border = 0;
    }
    if (this.state.view) {
      return (
        <Modal {...this.props}>{this.renderGrid()}</Modal>
      )
    }
    return (
      <Modal {...this.props}>
        <Dropzone
          {...rest}
          uploads={uploads}
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
            {this.renderGrid()}
          </div>
        </Dropzone>
      </Modal>
    )
  }
}

S3Dropzone.defaultProps = {
  visible: true,
  done: () => {},
  onDrop: () => {},
  theme: theme.keys,
  classes: theme.classes,
  onClick: () => {},
  onClickAway: () => {}
}

const S3DropzoneWithUnique = props => {
  const uploads = uniqBy(props.uploads, upload => upload.id || upload.key)
  console.log(props)
  
  return <S3Dropzone {...props} uploads={uploads} />
}

export default withStore({
  uploads: [],
  visible: true
})(S3DropzoneWithUnique)