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
    className: ''
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
          classes={this.props.classes}
          onLoad={(evt) => {
            if (this.state.loading) {
              this.setState({ loading: false })
            }
          }}
          onError={(evt) => {
            this.updateStore('error', true)
          }}
          {...this.props}
        />
        <ThumbnailOverlay
          error={error}
          loading={loading}
          hover={this.state.hover}
          onClick={this.props.onClick}
          index={this.props.index}
          theme={this.props.theme}
          view={this.props.view}
          classes={this.props.classes}
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
