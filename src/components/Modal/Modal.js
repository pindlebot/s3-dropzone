import React from 'react'
import {
  CloseIcon,
  MaximizeIcon,
  MinimizeIcon
} from '../WindowIcons'
import ButtonWithInput from '../ButtonWithInput'
import PropTypes from 'prop-types'

export const ModalHeader = props => (
  <div className='dz-modal-header'>
    <div className='dz-modal-header-inner' style={{}}>
      <button
        className='dz-oval'
        onClick={evt => {
          evt.stopPropagation()
          props.props.setVisible(false)
          props.onClose(evt)
        }}
      >
        <CloseIcon />
      </button>
      <button
        className='dz-oval'
        onClick={evt => {
          evt.stopPropagation()
          props.setModalState('minimized')
        }}
      >
        <MinimizeIcon />
      </button>
      <button
        className='dz-oval'
        onClick={evt => {
          evt.stopPropagation()
          props.setModalState('maximized')
        }}
      >
        <MaximizeIcon />
      </button>
    </div>
  </div>
)

export const ModalFooter = props => props.modal === 'minimized' || props.view ? false : (
  <div
    onClick={evt => {
      evt.preventDefault()
      evt.stopPropagation()
    }}
    className={props.classes.modalFooter}>
    <ButtonWithInput {...props} />
  </div>
)

const createStyles = props => ({
  width: props.modal === 'maximized'
    ? '100%'
    : `${window.innerHeight / window.innerWidth * 90}vw`,
  height: props.modal === 'maximized'
    ? '100%'
    : '70vh',
  backgroundColor: props.modal === 'minimized'
    ? 'transparent'
    : '#F4F9FD',
  boxShadow: props.modal === 'minimized'
    ? 'none'
    : '0px 1px 2px 0px rgba(0, 0, 0, 0.14)'
})

const Modal = props => (
  <div className={props.classes.modalWrapper}>
    <div className={props.classes.modalOverlay} />
    <div
      className={props.classes.modal}
      style={createStyles(props)}
    >
      {props.children}
    </div>
  </div>
)

Modal.propTypes = {
  classes: PropTypes.object,
  modal: PropTypes.string
}

ModalHeader.propTypes = {
  setModalState: PropTypes.func,
  onClose: PropTypes.func
}

ModalFooter.propTypes = {
  modal: PropTypes.string,
  view: PropTypes.object,
  classes: PropTypes.object
}

export default Modal
