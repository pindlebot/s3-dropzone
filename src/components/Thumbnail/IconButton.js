import React from 'react'

const IconButton = props => (
  <div
    className={props.classes.thumbnailOverlayIcon}
    onClick={evt => props.onClick(evt, props.name, props.src)}
  >
    {props.children}
  </div>
)

export default IconButton
