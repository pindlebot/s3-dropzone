import React from 'react'
import UploadIcon from '../icons/Upload'

const Button = props => (
  <button
    className='s3-dropzone-button'
    style={props.theme.button}
    onClick={props.onClick}
  >
    {props.children}
  </button>
)

Button.defaultProps = {
  children: 'Upload'
}

export default Button
