import React from 'react'

const ModalHeader = props => (
  <div className='s3-dropzone-modal-header'>
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
)


const Modal = props => (
  <div className={props.classes.modalWrapper}>
    <div className={props.classes.modalOverlay} />
    <div className={props.classes.modal}
      style={props.modal === 'maximized' 
        ? { width: '100%', height: '100%' }
        : { width: '600px', height: '400px' }
      }
    >
      <ModalHeader {...props} /> 
      {props.children}
    </div>
  </div>
)

export default Modal