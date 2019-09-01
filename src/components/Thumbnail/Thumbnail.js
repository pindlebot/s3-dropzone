import React from 'react'
import PropTypes from 'prop-types'
import ThumbnailOverlay from '../ThumbnailOverlay'
import classNames from 'classnames'
import { pick } from 'react-valid-attributes'

function Image (props) {
  const className = classNames([
    props.classes.image,
    props.className
  ])
  const elementProps = pick(props, 'img')
  return (
    <img
      {...elementProps}
      style={props.style}
      className={className}
      onLoad={props.onLoad}
      onError={props.onError}
      src={props.src}
    />
  )
}

Image.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  onLoad: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  style: PropTypes.object
}

Image.defaultProps = {
  className: '',
  style: {}
}

function Thumbnail (props) {
  const [hover, setHover] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  const preventBubbles = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
  }

  const updateStore = (key, value) => {
    const { index } = props
    const uploads = [...props.uploads]
    uploads[index] = {
      ...uploads[index],
      [key]: value
    }
    props.setUploads(uploads)
  }

  const onLoad = (evt) => {
    if (loading) {
      setLoading(false)
    }
  }

  const onError = (evt) => {
    updateStore('error', true)
  }

  const onMouseEnter = () => setHover(true)
  const onMouseLeave = () => setHover(false)

  const { view, classes, error, theme } = props
  const className = classNames(
    classes.thumbnail,
    error
      ? 'dz-thumbnail-error'
      : loading
        ? 'dz-thumbnail-loading'
        : undefined
  )
  return (
    <figure
      style={theme.figure}
      onClick={preventBubbles}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Image
        onLoad={onLoad}
        onError={onError}
        {...props}
      />
      <ThumbnailOverlay
        error={error}
        hover={hover}
        {...props}
        loading={loading}
      />
    </figure>
  )
}

Thumbnail.defaultProps = {
  img: {},
  loading: false
}

Thumbnail.propTypes = {
  view: PropTypes.boolean,
  classes: PropTypes.object,
  error: PropTypes.boolean,
  theme: PropTypes.object,
  setUploads: PropTypes.func.isRequired
}

export default Thumbnail
