import React from 'react'
import Thumbnail from './components/Thumbnail'
import Button from './components/Button'
import Dropzone from './components/BaseDropzone';
import Grid from './components/Grid'
import * as theme from './theme'
import createClient from './createClient'
import Modal, { ModalFooter, ModalHeader } from './components/Modal'
import { withStore } from 'react-subscriptions'
import uniqBy from 'lodash.uniqby'
import debounce from 'lodash.debounce'

// @media only screen 
// and (min-device-width: 320px)
// and (max-device-width: 568px) {
//
// }

function arrayBufferToBase64(buffer) {
  var binary = ''
  var bytes = [].slice.call(new Uint8Array(buffer))
  bytes.forEach((b) => binary += String.fromCharCode(b))
  return window.btoa(binary)
}

class S3Dropzone extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      drag: false,
      view: undefined,
      modal: window.innerWidth > 568 ? undefined : 'maximized',
      gridSize: window.innerWidth >= 568 ? 6 : 1
    }

    this.client = createClient(props)
  }

  componentDidMount = () => {
    setTimeout(() => { window.addEventListener('click', this.onWindowClick) })
    setTimeout(() => { window.addEventListener('resize', debounce(this.onWindowResize, 200)) })
  }

  componentWillUnmount = () => {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = evt => {
    if (this.state.view) {
      this.setState({ view: undefined })
    }
  }

  onWindowResize = evt => {
    let width = evt.srcElement.innerWidth
    let gridSize = width >= 568 ? 6 : 1
    if (this.state.gridSize !== gridSize) {
      let modal = this.state.modal === undefined && gridSize === 1
        ? 'maximized'
        : this.state.modal
      this.setState({ gridSize, modal })
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
        modal={this.state.modal}
        className={this.state.view ? 's3-dropzone-grid-view' : ''}
        gridSize={this.state.gridSize}
      />
    )
  }

  setModalState = (state) => {
    this.setState({ 
      modal: this.state.modal === state
        ? undefined
        : state
    })
  }

  setRef = ref => {
    this.modalHeader = ref
    let { height } = ref.getBoundingClientRect()
    height = height / 2
    this.setState({ iconStyles: { width: height, height: height } })
  }

  render () {
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
  
    return (
      <Modal
        {...this.props}
        modal={this.state.modal}
        view={this.state.view}
      >
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
          store={store}
        >
          <ModalHeader
            setModalState={this.setModalState}
            setRef={this.setRef}
            iconStyles={this.state.iconStyles}
            {...this.props}
          />
            {this.renderGrid()}
          <ModalFooter 
           {...this.props}
            modal={this.state.modal}
            view={this.state.view}
            onClick={value => {
              fetch(value)
                .then(resp => 
                  resp.arrayBuffer()
                    .then(buff => {
                      var base64Flag = 'data:image/jpeg;base64,';
                      var imageStr = arrayBufferToBase64(buff);
                    })
                )
            }}
          />
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

const S3DropzoneWithUnique = props => 
  <S3Dropzone 
    {...props}
    uploads={uniqBy(props.uploads, upload => upload.id || upload.key)}
  />

export default withStore({
  uploads: [],
  visible: true
})(S3DropzoneWithUnique)