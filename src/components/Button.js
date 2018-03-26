import React from 'react'
import UploadIcon from './icons/Upload'

const Button = props => (
  <button style={props.theme.button}>
    <UploadIcon />
    {props.children}
  </button>
)

Button.defaultProps = {
  children: 'Upload'
}

export default Button