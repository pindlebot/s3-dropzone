import React from 'react'
import ModalDropzone from './components/BaseDropzone'
import Grid from './components/Grid'
import * as theme from './theme'
import createClient from './createClient'
import Modal, { ModalFooter, ModalHeader } from './components/Modal'
import { withStore } from 'react-subscriptions'
import uniqBy from 'lodash.uniqby'
import debounce from 'lodash.debounce'
import * as util from './util'
import fileType from 'file-type'

class S3Dropzone extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      drag: false,
      view: undefined,
      modal: window.innerWidth > 568 ? undefined : 'maximized',
      gridSize: window.innerWidth > 568 ? 6 : 1
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
      switch (state.gridSize) {
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
    this.props.handleClick(evt, type, upload)
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

  handleSubmit = async value => {
    let [_, key] = value.match(/.*\/([^?]+)/)
    key = decodeURIComponent(key).replace(/(\.(?=[^.]*\.))|[\\^`><{}[\]#%"'+~\s|]/g, '')
    let buff = await fetch(value)
      .then(resp => resp.arrayBuffer())
    let type = fileType(buff)
    let file = new File([buff], key, { type })
    this.onDrop([file])
  }

  onDrop = async files => {
    this.onDragLeave()
    let { uploads, errors } = await util.handleDrop(this.props, this.client, files)
    this.props.done(errors, uploads)
  }

  render () {
    const {
      theme,
      classes,
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
        <ModalDropzone
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
          onDrop={this.onDrop}
          className={this.state.drag ? 'drag' : undefined}
          draggable='true'
          theme={theme}
          classes={classes}
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
            onClick={this.handleSubmit}
          />
        </ModalDropzone>
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
  handleClick: () => {},
  onClose: () => {},
  tap: file => ({
    Fields: {
      key: `${Math.round(Date.now() / 1000)}-${file.name}`,
      'Content-Type': file.type
    }
  }),
  region: 'us-east-1',
  requestParams: {}
}

const S3DropzoneWithUnique = props =>
  <S3Dropzone
    {...props}
    uploads={uniqBy(props.uploads, upload => upload.id || upload.key)}
  />

const initialState = {
  uploads: [],
  visible: true
}

export default withStore(initialState)(S3DropzoneWithUnique)
