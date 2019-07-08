import React from 'react'

function ThumbnailIconButton (props) {
  return (
    <div
      className={props.classes.thumbnailOverlayIcon}
      onClick={evt => props.onClick(evt, props.name, props.src)}
    >
      {props.children}
    </div>
  )
}

export default ThumbnailIconButton
