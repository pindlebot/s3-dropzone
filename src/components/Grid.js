import React from 'react'
import Thumbnail from './Thumbnail'
import theme from '../theme'
import Button from './Button'
import KeyboardArrowRight from './icons/KeyboardArrowRight'
import KeyboardArrowLeft from './icons/KeyboardArrowLeft'
import classNames from 'classnames'

class Grid extends React.Component {

  state = {
    startIndex: 0,
    style: {}
  }

  onClickBefore = evt => {
    let { startIndex } = this.state
    evt.preventDefault()
    evt.stopPropagation()
    this.setState({ startIndex: Math.abs(startIndex - 6) })
  }

  onClickAfter = evt => {
    let { startIndex } = this.state
    evt.preventDefault()
    evt.stopPropagation()
    this.setState({ startIndex: startIndex + 6 })
  }

  renderGridBody = () => {
    let { startIndex } = this.state

    let { view } = this.props
    let uploads = [...this.props.uploads]
      .slice(startIndex, startIndex + 6)
    if (this.props.view) {
      uploads = [view]
    }
    
    return (
      <React.Fragment>
      {!view && <button
        className='before'
        onClick={this.onClickBefore}
        role='button'
        disabled={this.state.startIndex <= 0}
        >
        <KeyboardArrowLeft classes={this.props.classes} />
      </button>}
      {uploads.map((upload, index) => <Thumbnail
        index={index}
        key={index}
        {...upload}
        {...this.props}
      />)}
      {!view &&
        <React.Fragment>
          <button
            className='after'
            onClick={this.onClickAfter}
            role='button'
            disabled={(this.state.startIndex + 6) >= this.props.uploads.length}
          >
            <KeyboardArrowRight classes={this.props.classes} />
          </button>
        </React.Fragment>
      }
      </React.Fragment>
    )
  }

  render () {
    const { 
      drag,
      view,
      classes,
      modal,
      className
    } = this.props
    let uploadsTheme = this.props.theme.uploads
    let { startIndex } = this.state
    const minimized = modal === 'minimized'
    return (
      <div
        className={classNames(classes.grid, className)}
        style={{
          ...uploadsTheme,
          //backgroundColor: minimized ? 'transparent' : '#F4F9FD',
          //boxShadow: minimized ? 'none' : '0px 1px 2px 0px rgba(0, 0, 0, 0.14)',
          opacity: drag ? 0.5 : 1.0,
          ...this.state.style
        }}
        ref={ref => { this.grid = ref }}
        >
          {!minimized && this.renderGridBody()}
      </div>
    )
  }
}

Grid.defaultProps = {
  uploads: [],
  view: undefined
}

export default Grid
