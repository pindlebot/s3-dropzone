import React from 'react'
import UploadIcon from './icons/Upload'

const Button = props => (
<div className={props.classes.buttonWrapper}>
  <div className={props.classes.button}>
    <div className='s3-dropzone-button-content'
      style={props.theme.button}>
      <UploadIcon classes={props.classes} style={{marginRight: '15px'}}/>
      {props.children}
    </div>
  </div>
</div>
)

Button.defaultProps = {
  children: 'Upload'
}

export default Button