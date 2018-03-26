import React from 'react'
import Spinner from './SpinnerComponent'
import DeleteIcon from './icons/Delete'
import PageViewIcon from './icons/PageView'

const IconButton = props => (
  <div style={{
    margin: '5px',
    //width: '25px',
    //height: '25px',
    //padding: '2px',
    //boxSizing: 'border-box'
  }}
    onClick={evt => props.onClick(evt, props.name)}
  >
    {props.children}
  </div>
)
const ThumbnailOverlay = props => (
  <div
    style={{
      top: 0,
      left: 0,
      right: 0,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      padding: '5%',
      alignItems: 'center',
      width: '100%',
      position: 'absolute',
      color: '#fff',
      boxSizing: 'border-box',
      height: (props.img && props.img.height) || '100%'
    }}
    className='thumbnail-overlay-icon'
  >
    <IconButton 
      onClick={props.onClick}
      name='view'>
      <PageViewIcon />
    </IconButton>
    <IconButton 
      onClick={props.onClick}
      name='delete'>
      <DeleteIcon />
    </IconButton>
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
  
  onClick = (evt, type) => {
    evt.preventDefault()
    console.log(type)
  }

  preventBubbles = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
  }

  render () {
    const {
      placeholder,
      ...rest
    } = this.props.img
    const { hover } = this.state
    const styles = {
      ...this.props.theme.img,
      filter: this.props.img.placeholder 
        ? 'blur(1px)'
        : 'none'
    }
    return (
      <figure 
        style={this.props.theme.figure}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.preventBubbles}
      >
        <img
          {...rest} 
          style={styles}
          ref={ref => { this.ref = ref }}
        />
        {hover && <ThumbnailOverlay
              hover={hover}
              img={this.ref}
              onClick={this.onClick}
            />
         }
        {placeholder && <Spinner theme={this.props.theme} />}
      </figure>
    )
  }
}

Thumbnail.defaultProps = {
  img: {}
}

export default Thumbnail