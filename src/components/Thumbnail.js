import React from 'react'
import Spinner from './SpinnerComponent'
import DeleteIcon from './icons/Delete'
import PageViewIcon from './icons/PageView'
import CloseIcon from './icons/Close'

const IconButton = props => (
  <div style={{
    margin: '5px',
  }}
    onClick={evt => props.onClick(evt, props.name, props.index)}
  >
    {props.children}
  </div>
)
const ThumbnailOverlay = props => (
  <div
    style={{
      ...props.theme.thumbnailOverlay,
      display: (props.hover || props.view) ? 'flex' : 'none'
    }}
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

class Thumbnail extends React.Component {
  state = {
    hover: false
  }

  onMouseEnter = () => {
    this.setState({ hover: true })
  }

  onMouseLeave = () => {
    this.setState({ hover: false})
  }

  preventBubbles = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
  }

  render () {
    const { hover } = this.state
    const styles = {
      ...this.props.theme.img,
      filter: this.props.loading
        ? 'blur(1px)'
        : 'none'
    }
    return (
      <figure 
        style={this.props.theme.figure}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.preventBubbles}
        className='s3-dropzone-thumbnail'
      >
        <img
          {...this.props.img} 
          style={styles}
          ref={ref => { this.ref = ref }}
        />
        <ThumbnailOverlay
          hover={hover}
          onClick={this.props.onClick}
          index={this.props.index}
          theme={this.props.theme}
          view={this.props.view}
        />
        <Spinner
          theme={this.props.theme}
          style={{
            ...this.props.theme.spinnerContainer,
            display: this.props.loading ? 'flex' : 'none'
          }}
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