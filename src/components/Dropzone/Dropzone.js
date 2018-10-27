import React from 'react'
import fileType from 'file-type'
import ModalDropzone from '../BaseDropzone'
import Grid from '../Grid/Grid'
import * as theme from '../../lib/theme'
import Modal, { ModalFooter, ModalHeader } from '../Modal/Modal'
import { createDropHandler } from '../../lib/createDropHandler'
import withResize from '../../lib/withResize'
import withAWS from '../../lib/withAWS'
import { Provider, connect } from 'react-redux'
import { store } from '../../lib/redux'
import { compose } from 'redux'

class S3Dropzone extends React.Component {
  state = {}

  static defaultProps = {
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
    requestParams: {}
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const view = nextProps.redux.windowClick && prevState.view
      ? undefined
      : prevState.view

    return { view }
  }

  componentDidMount () {
    if (this.props.uploads) {
      this.props.dispatch({
        type: 'SET_UPLOADS',
        payload: this.props.uploads
      })
    }
  }

  onClick = async (evt, type, key) => {
    let upload = this.props.redux.uploads.find(({ src }) => src === key)
    evt.preventDefault()
    if (type === 'delete') {
      if (!upload.error) {
        this.props.client.remove(upload.id || upload.key)
      }
      let uploads = [...this.props.redux.uploads].filter(({ src }) => src !== key)
      this.props.dispatch({
        type: 'SET_UPLOADS',
        payload: uploads
      })
    } else if (type === 'view') {
      this.props.dispatch({
        type: 'SET_VIEW',
        payload: upload
      })
    } else if (type === 'close') {
      this.props.dispatch({
        type: 'SET_VIEW',
        payload: undefined
      })
    }
    this.props.handleClick(evt, type, upload)
  }

  renderGrid = () => {
    return (
      <Grid
        {...this.props}
        onClick={this.onClick}
        uploads={this.props.redux.uploads}
        view={this.props.redux.view}
        modal={this.props.redux.modal}
        gridSize={this.props.redux.gridSize}
      />
    )
  }

  setModalState = (state) => {
    let { redux: { modal } } = this.props
    this.props.dispatch({
      type: 'SET_MODAL',
      payload: modal === state ? undefined : state
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
      uploads,
      ...rest
    } = this.props
    let visible = this.props.visible || this.props.redux.visible
    if (!visible) return false
    return (
      <Modal
        {...this.props}
        modal={this.props.redux.modal}
        view={this.props.redux.view}
        dispatch={this.props.dispatch}
      >
        <ModalDropzone
          onDrop={this.onDrop}
          draggable='true'
          theme={theme}
          classes={classes}
          dispatch={this.props.dispatch}
          className={this.props.redux.drag ? 'drag' : ''}
        >
          <ModalHeader
            setModalState={this.setModalState}
            iconStyles={this.state.iconStyles}
            dispatch={this.props.dispatch}
            {...this.props}
          />
          {this.renderGrid()}
          <ModalFooter
            modal={this.props.redux.modal}
            view={this.props.redux.view}
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
  connect(state => state, dispatch => ({ dispatch })),
  withAWS,
  withResize
)(S3Dropzone)
