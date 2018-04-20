import React from 'react'
import ReactDropzone from 'react-dropzone'
import createClient from '../../createClient'
import classNames from 'classnames'
import * as util from './util'

class BaseDropzone extends React.Component {

  constructor (props) {
    super(props)
   
    this.client = createClient(props)
  }

  onDrop = async files => {
    this.props.onDragLeave()
    let { uploads, errors } = await util.onDrop(this.props, this.client, files)
    console.log({ uploads, errors })
    this.props.done(errors, uploads)
  }

  render () {
    const {
      done,
      onDrop,
      requestParams,
      theme,
      region,
      identityPoolId,
      bucketName,
      className: classNameProp,
      classes,
      tap,
      uploads,
      store,
      ...rest
    } = this.props
  
    const className = classNames(
      classes.dropzone,
      classNameProp
    )
    return (
      <ReactDropzone 
       className={className} 
       onDrop={this.onDrop} 
       style={theme.dropzone}
       {...rest}
      />
    )
  }
}


BaseDropzone.defaultProps = {
  requestParams: {},
  onDrop: () => {},
  done: () => {},
  region: 'us-east-1',
  tap: file => ({
    Fields: {
      key: `${Math.round(Date.now() / 1000)}-${file.name}`,
      'Content-Type': file.type,
    }
  })
}

export default BaseDropzone