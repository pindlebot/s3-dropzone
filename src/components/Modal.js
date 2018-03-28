import React from 'react'

const Modal = props => (
  <div className={props.classes.modalWrapper}>
    <div className={props.classes.modalOverlay} />
    <div className={props.classes.modal}>
      {props.children}
    </div>
  </div>
)

export default Modal