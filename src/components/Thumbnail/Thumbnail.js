import React from 'react'
import ThumbnailOverlay from './ThumbnailOverlay'
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

class Thumbnail extends React.Component {
  state = {
    hover: false,
    loading: true,
    className: '',
    dimensions: {},
    aspectRatio: 1
  }

  preventBubbles = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
  }

  updateStore = (key, value) => {
    let { index } = this.props
    let uploads = [...this.props.uploads]
    uploads[index] = {
      ...uploads[index],
      [key]: value
    }
    this.props.store.update('uploads', uploads)
  }

  refCallback = ref => {
    if (ref) {
      let { width, height } = ref.getBoundingClientRect()
      this.setState({ dimensions: { width, height } })
    }
  }

  render () {
    const { view, classes, error } = this.props
    const loading = this.state.loading
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
        style={this.props.theme.figure}
        onClick={this.preventBubbles}
        className={className}
        onMouseEnter={() => {
          this.setState({ hover: true })
        }}
        onMouseLeave={() => {
          this.setState({ hover: false })
        }}
      >
        <Image
          onLoad={(evt) => {
            if (this.state.loading) {
              this.setState({ loading: false })
            }
          }}
          onError={(evt) => {
            this.updateStore('error', true)
          }}
          refCallback={this.refCallback}
          {...this.props}
        />
        <ThumbnailOverlay
          error={error}
          loading={loading}
          hover={this.state.hover}
          dimensions={this.state.dimensions}
          {...this.props}
        />
      </figure>
    )
  }
}

Thumbnail.defaultProps = {
  img: {},
  loading: false
}

export default Thumbnail
