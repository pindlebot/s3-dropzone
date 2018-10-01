import React from 'react'
import IconButton from './IconButton'
import DeleteIcon from '../icons/Delete'
import CloseIcon from '../icons/Close'
import AddIcon from '../icons/Add'
import Spinner from './SpinnerComponent'
import ErrorIcon from '../icons/Error'
import ZoomOutMap from '../icons/ZoomOutMap'

function DefaultToolbar (props) {
  return (
    <React.Fragment>
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
            name='view'>
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
            name='insert'>
            <AddIcon
              classes={props.classes}
              fill={props.fill}
            />
          </IconButton>
        </React.Fragment>}
      </div>
    </React.Fragment>
  )
}

const ThumbnailOverlayWrapper = props => (
  <div
    className={props.className}
    style={props.dimensions}
  >
    {props.children}
  </div>
)

export default class ThumbnailOverlay extends React.Component {
  renderOverlay () {
    const {
      classes,
      loading,
      error,
      hover,
      view
    } = this.props
    const isExpanded = !!view
    if (isExpanded) {
      return hover
        ? (
          <IconButton
            {...this.props}
            onClick={this.props.onClick}
            index={this.props.index}
            src={this.props.src}
            name='close'>
            <CloseIcon classes={classes} />
          </IconButton>
        )
        : false
    } else if (hover) {
      return (
        <DefaultToolbar
          {...this.props}
          onClick={this.props.onClick}
          src={this.props.src}
          index={this.props.index}
          fill={error ? '#fff' : '#fff'}
        />
      )
    } else if (error) {
      return (
        <div className='dz-thumbnail-overlay-column'>
          <ErrorIcon
            classes={classes}
            fill={'#e4567b'}
          />
        </div>
      )
    } else if (loading) {
      return (
        <div className='dz-thumbnail-overlay-column'>
          <Spinner
            theme={this.props.theme}
            show={this.props.loading}
          />
        </div>
      )
    } else {
      return false
    }
  }

  render () {
    console.log('overlay', this.props)
    const dimensions = this.props.view
      ? { width: '100%', height: '100%' }
      : this.props.dimensions
    return (
      <ThumbnailOverlayWrapper
        {...this.props}
        dimensions={dimensions}
        className={this.props.classes.thumbnailOverlay}
      >
        {this.renderOverlay()}
      </ThumbnailOverlayWrapper>
    )
  }
}
