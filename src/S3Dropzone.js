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
import * as util from './components/BaseDropzone/util'
import fileType from 'file-type'

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
    window.removeEventListener('click', this.onWindowClick)
    window.removeEventListener('resize', this.onWindowResize)
  }

  onWindowClick = evt => {
    if (this.state.view) {
      this.setState({ view: undefined })
    }
  }

  onWindowResize = evt => {
    let state = {}
    let width = evt.srcElement.innerWidth
    state.gridSize = width >= 568 ? 6 : 1
    if (this.state.gridSize !== state.gridSize) {
      let modal
      switch(state.gridSize) {
        case 6:
          modal = undefined
          break
        case 1:
          modal = 'maximized'
      }
      state.modal = modal
      this.setState(state)
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

  onDragEnter = (evt) => {
    this.setState({ drag: true })
  }

  onDragLeave = (evt) => {
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

  render () {
    const {
      thumbnailsContainer,
      theme,
      onClick,
      onClickAway,
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
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
          className={this.state.drag ? 'drag' : undefined}
          draggable='true'
          theme={theme}
        >
          <ModalHeader
            setModalState={this.setModalState}
            iconStyles={this.state.iconStyles}
            {...this.props}
          />
            {this.renderGrid()}
          <ModalFooter 
           {...this.props}
            modal={this.state.modal}
            view={this.state.view}
            onClick={async value => {
              this.onDragLeave()
              let [_, key] = value.match(/.*\/([^?]+)/)
              let buff = await fetch(value)
                .then(resp => resp.arrayBuffer())
              let type = fileType(buff)
              let file = new File([buff], key, { type });
              let { uploads, errors } = await util.onDrop(this.props, this.client, [file])
              this.props.done(errors, uploads)
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