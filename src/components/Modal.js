import React from 'react'
import Button from './Button'

export const ModalHeader = props => (
  <div className='s3-dropzone-modal-header'>
    <div className='s3-dropzone-modal-header-inner'>
      <div
        className='s3-dropzone-oval1'
        onClick={evt => {
          evt.stopPropagation()
          props.store.update('visible', false)
          props.onClickAway(evt)
        }}
      />
      <div
        className='s3-dropzone-oval2'
        onClick={evt => {
          evt.stopPropagation()
          props.minimize()
        }}
      />
      <div
        className='s3-dropzone-oval3'
        onClick={evt => {
          evt.stopPropagation()
          props.maximize()
        }}
      />
    </div>
  </div>
)

export const ModalFooter = props => props.modal === 'minimized' || props.view ? false : (
  <div className={props.classes.modalFooter}>
    <Button theme={props.theme} classes={props.classes} />
  </div>
)

const createStyles = props => ({
  width: props.modal === 'maximized' ? '100%' : '600px',
  height: props.modal === 'maximized' ? '100%' : '400px',
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
