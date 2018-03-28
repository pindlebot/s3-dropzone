import React from 'react'
import Thumbnail from './Thumbnail'
import theme from '../theme'
import Button from './Button'

function Uploads(props) {
  const { 
    drag,
    view,
    classes,
  } = props
  let uploadsTheme = props.theme.uploads
  let uploads = props.uploads
  if (view) {
    uploadsTheme.gridTemplateColumns = '1fr'
    uploadsTheme.gridAutoRows = 'auto'
    uploads = [view]
  } else {
    uploadsTheme.gridTemplateColumns = '1fr 1fr 1fr'
    uploadsTheme.gridAutoRows = 'minmax(150px, 50%)'
  }
  
  return (
    <div
      className={classes.uploads}
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
    {!view && <div className={classes.buttonContainer}>
      <Button theme={props.theme} classes={classes} />
    </div>}
    </div>
  )
}

Uploads.defaultProps = {
  uploads: [],
  view: undefined
}

export default Uploads
