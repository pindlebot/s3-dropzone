import React from 'react'
import fileType from 'file-type'
import ModalDropzone from '../BaseDropzone'
import { Provider, connect } from 'react-redux'
import { compose } from 'redux'

import Grid from '../Grid/Grid'
import * as theme from '../../lib/theme'
import Modal, { ModalFooter, ModalHeader } from '../Modal/Modal'
import { createDropHandler } from '../../lib/createDropHandler'
import withResize from '../../lib/withResize'
import withAWS from '../../lib/withAWS'
import { store } from '../../store/store'
import {
  setUploads,
  setModal,
  setDimensions,
  setView,
  setVisible,
  setDrag
} from '../../store/actions'

function noop () {}

function mapFileToParams (file) {
  return {
    Fields: {
      key: `${Math.round(Date.now() / 1000)}-${file.name}`,
      'Content-Type': file.type
    }
  }
}

class S3Dropzone extends React.Component {
  state = {}

  static defaultProps = {
    done: noop,
    onDrop: noop,
    theme: theme.keys,
    classes: theme.classes,
    handleClick: noop,
    onClose: noop,
    mapFileToParams,
    region: 'us-east-1',
    requestParams: {}
  }

  componentDidMount () {
    if (this.props.uploads) {
      this.props.setUploads(this.props.uploads)
    }
  }

  onClick = async (evt, type, key) => {
    evt.preventDefault()
    const upload = this.props.uploads.find(({ src }) => src === key)
    if (type === 'delete') {
      if (!upload.error) {
        this.props.client.remove(upload.id || upload.key)
      }
      const uploads = [...this.props.uploads].filter(({ src }) => src !== key)
      this.props.setUploads(uploads)
    } else if (type === 'view') {
      this.props.setView(upload)
    } else if (type === 'close') {
      this.props.setView(undefined)
    }
    this.props.handleClick(evt, type, upload)
  }

  renderGrid = () => {
    return (
      <Grid
        {...this.props}
        onClick={this.onClick}
        uploads={this.props.uploads}
        view={this.props.view}
        modal={this.props.modal}
        gridSize={this.props.gridSize}
      />
    )
  }

  setModalState = (state) => {
    const { modal } = this.props
    this.props.setModal(modal === state ? undefined : state)
  }

  handleSubmit = async value => {
    let [_, key] = value.match(/.*\/([^?]+)/)
    key = decodeURIComponent(key).replace(/(\.(?=[^.]*\.))|[\\^`><{}[\]#%"'+~\s|]/g, '')
    const buff = await fetch(value)
      .then(resp => resp.arrayBuffer())
    const type = fileType(buff)
    const file = new File([buff], key, { type })
    this.onDrop([file])
  }

  onDrop = async files => {
    this.props.onDragLeave()
    const handleDrop = createDropHandler(this.props)
    const { uploads, errors } = await handleDrop(files)
    this.props.done(errors, uploads)
  }

  render () {
    const {
      theme,
      classes,
      uploads,
      ...rest
    } = this.props
    const visible = this.props.open || this.props.visible
    if (!visible) return false
    return (
      <Modal
        {...this.props}
        modal={this.props.modal}
        view={this.props.view}
      >
        <ModalDropzone
          onDrop={this.onDrop}
          draggable='true'
          theme={theme}
          classes={classes}
          className={this.props.drag ? 'drag' : ''}
          setDrag={this.props.setDrag}
        >
          <ModalHeader
            setModalState={this.setModalState}
            iconStyles={this.state.iconStyles}
            {...this.props}
          />
          {this.renderGrid()}
          <ModalFooter
            modal={this.props.modal}
            view={this.props.view}
            onClick={this.handleSubmit}
            {...this.props}
          />
        </ModalDropzone>
      </Modal>
    )
  }
}

export default compose(
  Component => props => (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  ),
  connect(state => state.s3dropzone, {
    setUploads,
    setModal,
    setDimensions,
    setView,
    setVisible,
    setDrag
  }),
  withAWS,
  withResize
)(S3Dropzone)
