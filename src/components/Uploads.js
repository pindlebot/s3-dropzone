import React from 'react'
import Thumbnail from './Thumbnail'
import theme from '../theme'
import Button from './Button'

function Uploads(props) {
  const { 
    drag,
    view
  } = props
  let uploadsTheme = props.theme.uploads
  let uploads = props.uploads
  if (view) {
    uploadsTheme.gridTemplateColumns = '1fr'
    uploads = [view]
  } else {
    uploadsTheme.gridTemplateColumns = '1fr 1fr 1fr'
    //uploadsTheme.gridTemplateRows = 'repeat(2, calc(50% - 10px))'
  }
  
  return (
    <div
      className='s3-dropzone-uploads'
      style={{
        ...uploadsTheme,
        opacity: drag ? 0.5 : 1.0
      }}>
      {uploads.map((upload, i) => {
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
    {!view && <div className='s3-dropzone-button-container'>
      <Button theme={props.theme} />
    </div>}
    </div>
  )
}

Uploads.defaultProps = {
  uploads: [],
  view: undefined
}

export default Uploads
