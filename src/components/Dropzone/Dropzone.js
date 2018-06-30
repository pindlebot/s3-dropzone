import React from 'react'
import fileType from 'file-type'
import ModalDropzone from '../BaseDropzone'
import Grid from '../Grid/Grid'
import * as theme from '../../lib/theme'
import Modal, { ModalFooter, ModalHeader } from '../Modal/Modal'
import { createDropHandler } from '../../lib/createDropHandler'
import withResize from '../../lib/withResize'
import withMergedProps from '../../lib/withMergedProps'
import withAWS from '../../lib/withAWS'

class S3Dropzone extends React.Component {
  state = {
    view: undefined,
    modal: undefined,
    gridSize: 6
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const gridSize = nextProps.width >= 568 ? 6 : 1
    const modal = gridSize > 1 ? undefined : 'maximized'
    const view = nextProps.windowClick && prevState.view
      ? undefined
      : prevState.view

    return { gridSize, modal, view }
  }

  onClick = async (evt, type, index) => {
    let upload = {...this.props.uploads[index]}
    evt.preventDefault()
    if (type === 'delete') {
      if (!upload.error) {
        this.props.client.remove(upload.id || upload.key)
      }
      let uploads = [...this.props.uploads]
      uploads.splice(index, 1)
      this.props.dispatch(() => ({ uploads }))
    } else if (type === 'view') {
      this.setState({ view: upload })
    } else if (type === 'close') {
      this.setState({ view: undefined })
    }
    this.props.handleClick(evt, type, upload)
  }

  renderGrid = () => {
    return (
      <Grid
        {...this.props}
        onClick={this.onClick}
        uploads={this.props.uploads}
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
    this.props.onDragLeave()
    const handleDrop = createDropHandler(this.props)
    const { uploads, errors } = await handleDrop(files)
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
          onDragEnter={this.props.onDragEnter}
          onDragLeave={this.props.onDragLeave}
          onDrop={this.onDrop}
          className={this.props.drag ? 'drag' : undefined}
          draggable='true'
          theme={theme}
          classes={classes}
          dispatch={this.props.dispatch}
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
  mapFileToParams: file => ({
    Fields: {
      key: `${Math.round(Date.now() / 1000)}-${file.name}`,
      'Content-Type': file.type
    }
  }),
  region: 'us-east-1',
  requestParams: {},
  uploads: []
}

const initialState = {
  uploads: [],
  visible: true
}

export default withMergedProps(initialState)(
  withAWS(
    withResize(S3Dropzone)
  )
)
