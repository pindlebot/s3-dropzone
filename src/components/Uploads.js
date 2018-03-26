import React from 'react'
import Thumbnail from './Thumbnail'
import theme from '../theme'

function Uploads(props) {
  const { 
    drag,
    view,
    uploads
  } = props
  let _uploads = props.uploads
  let theme = props.theme.uploads

  if (view) {
    theme.gridTemplateColumns = '1fr'
    theme.gridTemplateRows = '1fr'
    _uploads = [view]
  } else {
    theme.gridTemplateColumns = '1fr 1fr 1fr'
    theme.gridTemplateRows = 'repeat(2, calc(50% - 10px))'
  }
  
  return (
    <div
      className='s3-dropzone-uploads'
      style={{...props.theme.uploads, opacity: drag ? 0.5 : 1.0}}>
    {_uploads.map((upload, i) => {
      const { loading, ...rest } = upload
      return (<Thumbnail
        loading={loading}
        index={i}
        key={i}
        img={rest}
        {...props}
      />)
    }
    )}
    </div>
  )
}

Uploads.defaultProps = {
  uploads: [],
  view: undefined
}

export default Uploads
