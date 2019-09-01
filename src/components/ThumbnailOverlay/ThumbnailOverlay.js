import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '../ThumbnailIconButton'
import DeleteIcon from '../icons/Delete'
import CloseIcon from '../icons/Close'
import AddIcon from '../icons/Add'
import Spinner from '../ThumbnailSpinner'
import ErrorIcon from '../icons/Error'
import ZoomOutMap from '../icons/ZoomOutMap'

function DefaultToolbar (props) {
  return (
    <>
      <div className='dz-thumbnail-overlay-row'>
        <IconButton
          {...props}
          onClick={props.onClick}
          index={props.index}
          name='delete'
          src={props.src}
        >
          <DeleteIcon
            classes={props.classes}
            fill={props.fill}
          />
        </IconButton>
        {!props.error && <React.Fragment>
          <IconButton
            {...props}
            onClick={props.onClick}
            index={props.index}
            src={props.src}
            name='view'
          >
            <ZoomOutMap
              classes={props.classes}
              fill={props.fill}
            />
          </IconButton>
          <IconButton
            {...props}
            onClick={props.onClick}
            index={props.index}
            src={props.src}
            name='insert'
          >
            <AddIcon
              classes={props.classes}
              fill={props.fill}
            />
          </IconButton>
        </React.Fragment>}
      </div>
    </>
  )
}

function ThumbnailOverlayWrapper (props) {
  return (
    <div className={props.className}>
      {props.children}
    </div>
  )
}

function ThumbnailOverlay (props) {
  const { error } = props

  function renderToolbar () {
    return (
      <DefaultToolbar
        {...props}
        onClick={props.onClick}
        src={props.src}
        index={props.index}
        fill={error ? '#fff' : '#fff'}
      />
    )
  }

  function renderLoading () {
    return (
      <div className='dz-thumbnail-overlay-column'>
        <Spinner
          theme={props.theme}
          show={props.loading}
        />
      </div>
    )
  }

  function renderError () {
    return (
      <div className='dz-thumbnail-overlay-column'>
        <ErrorIcon
          classes={props.classes}
          fill={'#e4567b'}
        />
      </div>
    )
  }

  function renderClose () {
    return (
      <IconButton
        {...props}
        onClick={props.onClick}
        index={props.index}
        src={props.src}
        name='close'
      >
        <CloseIcon classes={props.classes} />
      </IconButton>
    )
  }

  const renderOverlay = () => {
    const {
      loading,
      error,
      hover,
      view
    } = props
    const isExpanded = Boolean(view)
    return isExpanded && hover
      ? renderClose()
      : isExpanded
        ? null
        : hover
          ? renderToolbar()
          : error
            ? renderError()
            : loading
              ? renderLoading()
              : null
  }

  return (
    <ThumbnailOverlayWrapper
      {...props}
      className={props.classes.thumbnailOverlay}
    >
      {renderOverlay()}
    </ThumbnailOverlayWrapper>
  )
}

ThumbnailOverlayWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  hover: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
}

export default ThumbnailOverlay
