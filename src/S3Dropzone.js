import React from 'react'
import Thumbnail from './components/Thumbnail'
import Button from './components/Button'
import Dropzone from './components/BaseDropzone';
import Grid from './components/Grid'
import * as theme from './theme'
import createS3 from './s3'
import Modal from './components/Modal'
import withStore from './store/withStore'

class S3Dropzone extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      error: [],
      drag: false,
      view: undefined,
      startIndex: 0
    }

    this.s3 = createS3(props)
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
    console.log('handleDelete', upload)
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
        this.handleDelete(upload)
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
    console.log({ preview })
    const uploads = [...this.props.uploads]
    uploads.push(preview)
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
        <React.Fragment>
        <Grid 
          {...this.props}
          onClick={this.onClick}
          uploads={this.props.uploads}
          drag={this.state.drag}
          view={this.state.view}
          startIndex={this.state.startIndex}
        />
      </React.Fragment>
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
      onClickAway,
      store,
      visible,
      ...rest
    } = this.props
    const { loading } = this.state
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
    console.log(this.props)
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
            {this.renderGrid()}
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
  onClick: () => {},
  onClickAway: () => {}
}

export default withStore(S3Dropzone)