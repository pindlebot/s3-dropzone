import React from 'react'
import Button from './Button'
import {
  CloseIcon,
  MaximizeIcon,
  MinimizeIcon
} from './WindowIcons'
import ButtonWithInput from './ButtonWithInput'

export const ModalHeader = props => (
  <div className='s3-dropzone-modal-header'>
    <div className='s3-dropzone-modal-header-inner' ref={props.setRef}>
      <button
        className='s3-dropzone-oval'
        onClick={evt => {
          evt.stopPropagation()
          props.store.update('visible', false)
          props.onClickAway(evt)
        }}
      >
        <CloseIcon
          width={'0.5rem'}
          height={'0.5rem'}
        />
      </button>
      <button
        className='s3-dropzone-oval'
        onClick={evt => {
          evt.stopPropagation()
          props.setModalState('minimized')
        }}
      >
        <MinimizeIcon
          width={'0.5rem'}
          height={'0.5rem'}
        />
      </button>
      <button
        className='s3-dropzone-oval'
        onClick={evt => {
          evt.stopPropagation()
          props.setModalState('maximized')
        }}
      >
        <MaximizeIcon
          width={'0.5rem'}
          height={'0.5rem'}
        />
      </button>
    </div>
  </div>
)

export const ModalFooter = props => props.modal === 'minimized' || props.view ? false : (
  <div className={props.classes.modalFooter}>
    <ButtonWithInput {...props} />
  </div>
)

const createStyles = props => ({
  width: props.modal === 'maximized' ? '100%' : `${window.innerHeight / window.innerWidth * 90}vw`,
  height: props.modal === 'maximized' ? '100%' : '70vh',
  backgroundColor: props.modal === 'minimized' ? 'transparent' : '#F4F9FD',
  boxShadow: props.modal === 'minimized' ? 'none' : '0px 1px 2px 0px rgba(0, 0, 0, 0.14)'
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

export default Modal
