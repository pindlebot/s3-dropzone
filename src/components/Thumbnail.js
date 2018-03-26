import React from 'react'
import Spinner from './SpinnerComponent'
import DeleteIcon from './icons/Delete'
import PageViewIcon from './icons/PageView'
import CloseIcon from './icons/Close'

const IconButton = props => (
  <div style={{
    margin: '5px',
  }}
    className='s3-dropzone-thumbnail-overlay-icon'
    onClick={evt => props.onClick(evt, props.name, props.index)}
  >
    {props.children}
  </div>
)

const ThumbnailOverlay = props => {
  const styles = props.theme.thumbnailOverlay
 
  return (
    <div
      style={styles}
      className='s3-dropzone-thumbnail-overlay'
    >
      {props.view ?
      <IconButton 
        onClick={props.onClick}
        index={props.index}
        name='close'>
        <CloseIcon />
      </IconButton> :
      <React.Fragment>
        <IconButton 
          onClick={props.onClick}
          index={props.index}
          name='view'>
          <PageViewIcon />
        </IconButton>
        <IconButton 
          onClick={props.onClick}
          index={props.index}
          name='delete'>
          <DeleteIcon />
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
    const { view } = this.props
    let imageClassNames = ['s3-dropzone-thumbnail-img']
    if (loading) {
      imageStyles.visibility = 'hidden'
    } else if (!view) {
      imageClassNames.push('s3-dropzone-thumbnail-blur')
    }
    console.log({ loading })
    return (
      <figure 
        style={this.props.theme.figure}
        onClick={this.preventBubbles}
        className='s3-dropzone-thumbnail'
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
          onClick={this.props.onClick}
          index={this.props.index}
          theme={this.props.theme}
          view={this.props.view}
        />
        <Spinner
          theme={this.props.theme}
          show={loading}
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