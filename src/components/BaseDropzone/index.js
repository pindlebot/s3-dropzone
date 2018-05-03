import React from 'react'
import ReactDropzone from 'react-dropzone'
import classNames from 'classnames'

function BaseDropzone (props) {
  const {
    theme,
    classes,
    className: classNameProp,
    dispatch,
    ...rest
  } = props
  const className = classNames(
    classes.dropzone,
    classNameProp
  )
  return (
    <ReactDropzone
      className={className}
      style={theme.dropzone}
      {...rest}
    />
  )
}

export default BaseDropzone
