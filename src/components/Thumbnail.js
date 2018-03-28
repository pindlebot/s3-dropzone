import React from 'react'
import Spinner from './SpinnerComponent'
import DeleteIcon from './icons/Delete'
import PageViewIcon from './icons/PageView'
import CloseIcon from './icons/Close'
import AddIcon from './icons/Add'

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

const ThumbnailOverlay = props => {
  const { classes } = props
  const styles = props.theme.thumbnailOverlay
  if (props.loading) {
    return (
      <div
        style={styles}
        className={classes.thumbnailOverlay}
      >
        <Spinner
          theme={props.theme}
          show={props.loading}
        />
      </div>
    )
  }
  return (
    <div
      style={styles}
      className={[classes.thumbnailOverlay, classes.hidden].join(' ')}
    >
      {props.view ?
      <IconButton 
        {...props}
        onClick={props.onClick}
        index={props.index}
        name='close'>
        <CloseIcon classes={classes} />
      </IconButton> :
      <React.Fragment>
        <IconButton 
         {...props}
          onClick={props.onClick}
          index={props.index}
          name='delete'>
          <DeleteIcon classes={classes} />
        </IconButton>
        <IconButton 
         {...props}
          onClick={props.onClick}
          index={props.index}
          name='view'>
          <PageViewIcon classes={classes} />
        </IconButton>
        <IconButton
          {...props}
          onClick={props.onClick}
          index={props.index}
          name='insert'>
          <AddIcon classes={classes} />
        </IconButton>
      </React.Fragment>}
    </div>
  )
}

class Thumbnail extends React.Component {
  state = {
    hover: false,
    loading: true,
    error: false,
    blur: 5
  }

  componentDidMount = () => {
    this.timer = setInterval(this.sharpen, 100)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  preventBubbles = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
  }

  sharpen = () => {
    if (this.state.blur > 0) {
      this.setState({ blur: this.state.blur - 0.5 })
    } else {
      clearInterval(this.timer)
    }
  }

  render () {
    const imageStyles = {...this.props.theme.img}
    const loading = this.state.loading || this.props.loading
    const { view, classes } = this.props
    let imageClassNames = [classes.image]
    if (loading) {
      imageStyles.visibility = 'hidden'
    } else if (!view) {
      imageClassNames.push('s3-dropzone-thumbnail-blur')
    }
    return (
      <figure 
        style={this.props.theme.figure}
        onClick={this.preventBubbles}
        className={classes.thumbnail}
      >
        <img
          {...this.props.img} 
          style={imageStyles}
          ref={ref => { this.ref = ref }}
          className={imageClassNames.join(' ')}
          onLoad={(evt) => {
            setTimeout(() => {
              this.setState({ loading: false })
            }, 0)
          }}
          onError={(evt) => {
            this.setState({ error: true })
          }}
        />
        <ThumbnailOverlay
          loading={loading}
          onClick={this.props.onClick}
          index={this.props.index}
          theme={this.props.theme}
          view={this.props.view}
          classes={this.props.classes}
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