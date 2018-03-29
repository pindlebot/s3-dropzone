import React from 'react'
import Thumbnail from './components/Thumbnail'
import Button from './components/Button'
import Dropzone from './components/BaseDropzone';
import Grid from './components/Grid'
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
      visible: true,
      startIndex: 0
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

  onWindowClick = (evt) => {
    if (this.state.view) {
      this.setState({ view: undefined })
    } else {
      this.setState({ visible: false })
      this.props.onClickAway(evt)
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.uploads) {
      const visible = nextProps.hasOwnProperty('visible') 
        ? visible
        : this.state.visible
      this.setState({ uploads: nextProps.uploads, visible })
    } else if (nextProps.hasOwnProperty('visible')) {
      this.setState({ visible: nextProps.visible })
    } 
  }

  handleDelete = (upload) => {
    const { bucketName } = this.props
    return this.s3.deleteObject({
      Bucket: bucketName,
      Key: upload.key
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

  onDragEnd = (evt) => {
    this.setState({ drag: false })
  }

  renderGrid = () => {
    return (
        <React.Fragment>
        <Grid 
          {...this.props}
          onClick={this.onClick}
          uploads={this.state.uploads}
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
      ...rest
    } = this.props
    const { loading, visible } = this.state
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

export default S3Dropzone