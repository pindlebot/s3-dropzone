import React from 'react'
import UploadIcon from './icons/Upload'

const Button = props => (
  <button style={props.theme.button} className='s3-dropzone-button'>
    <UploadIcon />
    {props.children}
  </button>
)

Button.defaultProps = {
  children: 'Upload'
}

export default Button