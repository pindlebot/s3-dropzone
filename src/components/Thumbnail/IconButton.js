import React from 'react'

const IconButton = props => (
  <div style={{
    margin: '5px',
  }}
    className={props.classes.thumbnailOverlayIcon}
    onClick={evt => props.onClick(evt, props.name, props.index)}
  >
    {props.children}
  </div>
)

export default IconButton