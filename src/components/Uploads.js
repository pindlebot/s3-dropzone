import React from 'react'
import Thumbnail from './Thumbnail'
import theme from '../theme'

function Uploads(props) {
  const { 
    uploads,
    drag
  } = props
  return (
    <div style={{...props.theme.uploads, opacity: drag ? 0.5 : 1.0}}>
    {uploads.map((upload, i) => 
      <Thumbnail
        key={i}
        img={upload}
        {...props}
      />
    )}
    </div>
  )
}

Uploads.defaultProps = {
  uploads: [],
}

export default Uploads
