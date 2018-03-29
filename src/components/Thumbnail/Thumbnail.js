import React from 'react'
import ThumbnailOverlay from './ThumbnailOverlay'
import classNames from 'classnames'

function Image(props) {
  const className = classNames([
    props.classes.image,
    props.className,
    ...props.classNames
  ])
  return (
      <img
      {...props.img} 
      style={props.style}
      className={className}
      onLoad={props.onLoad}
      onError={props.onError}
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
    error: false
  }

  preventBubbles = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
  }

  render () {
    const { error } = this.state
    const loading = (this.state.loading || this.props.loading) && !error
    const { view, classes } = this.props   
    const className = classNames(
      classes.thumbnail,
      loading 
        ? 's3-dropzone-thumbnail-loading'
        : error
          ? 's3-dropzone-thumbnail-error'
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
          className={
           !loading && !error && !view
              ? 's3-dropzone-blur'
              : undefined
          }
          classes={this.props.classes}
          img={{...this.props.img}}
          onLoad={(evt) => {
            this.setState({ loading: false })
          }}
          onError={(evt) => {
            this.setState({ error: true })
          }}
        />
        <ThumbnailOverlay
          hover={this.state.hover}
          loading={loading}
          onClick={this.props.onClick}
          index={this.props.index}
          theme={this.props.theme}
          view={this.props.view}
          classes={this.props.classes}
          error={this.state.error}
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