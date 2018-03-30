import React from 'react'
import IconButton from './IconButton'
import DeleteIcon from '../icons/Delete'
import PageViewIcon from '../icons/PageView'
import CloseIcon from '../icons/Close'
import AddIcon from '../icons/Add'
import Spinner from './SpinnerComponent'
import classNames from 'classnames'
import ErrorIcon from '../icons/Error'
import ZoomOutMap from '../icons/ZoomOutMap'

function DefaultToolbar (props) {
  return (
    <React.Fragment>
      <IconButton 
       {...props}
        onClick={props.onClick}
        index={props.index}
        name='delete'>
        <DeleteIcon classes={props.classes} fill={props.fill} />
      </IconButton>
      <IconButton 
       {...props}
        onClick={props.onClick}
        index={props.index}
        name='view'>
        <ZoomOutMap classes={props.classes} fill={props.fill} />
      </IconButton>
      <IconButton
        {...props}
        onClick={props.onClick}
        index={props.index}
        name='insert'>
        <AddIcon classes={props.classes} fill={props.fill} />
      </IconButton>
    </React.Fragment>
  )
}

const ThumbnailOverlayWrapper = props => (
  <div
    style={props.theme.thumbnailOverlay}
    className={props.classes.thumbnailOverlay}
  >
    {props.children}
  </div>
)

const ThumbnailOverlay = props => {
  const { 
    classes,
    loading,
    error,
    hover,
    theme,
    view
  } = props
  const styles = theme.thumbnailOverlay
  const className = classNames(
    classes.thumbnailOverlay
  )
  const isExpanded = !!view
  switch (true) {
    case loading:
      return (
        <Spinner
          theme={props.theme}
          show={props.loading}
        />
      )
    case isExpanded:
      return (
        <IconButton 
          {...props}
          onClick={props.onClick}
          index={props.index}
          name='close'>
          <CloseIcon classes={classes} />
        </IconButton>
      )
    case hover:
      return (
        <DefaultToolbar
          {...props}
          onClick={props.onClick}
          index={props.index}
          fill={error ? '#555' : '#fff'}
        />
      )
    case error:
      return (
        <ErrorIcon
          classes={classes}
          fill={'#555'}
        />
      )
    default:
      return false
  }
}

export default props => (
  <ThumbnailOverlayWrapper {...props}>
    <ThumbnailOverlay {...props} />
  </ThumbnailOverlayWrapper>
)

