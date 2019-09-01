import React from 'react'
import ThumbnailOverlay from '../ThumbnailOverlay'
import classNames from 'classnames'
import { pick } from 'react-valid-attributes'

function Image (props) {
  const className = classNames([
    props.classes.image,
    props.className,
    ...props.classNames
  ])
  const elementProps = pick(props, 'img')
  return (
    <img
      {...elementProps}
      style={props.style}
      className={className}
      onLoad={props.onLoad}
      onError={props.onError}
      src={props.data || props.src}
      ref={props.refCallback}
    />
  )
}

Image.defaultProps = {
  className: '',
  classNames: []
}

function Thumbnail (props) {

  // state = {
  //   hover: false,
  //   loading: true,
  //   className: '',
  //   dimensions: {},
  //   aspectRatio: 1
  // }
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
    props.updateStore('error', true)
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

export default Thumbnail
