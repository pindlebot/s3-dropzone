import React from 'react'
import UploadIcon from './icons/Upload'

const Button = props => (
  <button className='s3-dropzone-button'
    style={props.theme.button}>
    <UploadIcon classes={props.classes} style={{marginRight: '15px'}} />
    {props.children}
  </button>
)

Button.defaultProps = {
  children: 'Upload'
}

export default Button
