import React from 'react'
import Thumbnail from './Thumbnail'
import theme from '../theme'
import Button from './Button'
import KeyboardArrowRight from './icons/KeyboardArrowRight'
import KeyboardArrowLeft from './icons/KeyboardArrowLeft'
import classNames from 'classnames'
import { start } from 'pretty-error';

const PrevButton = props => (props.modal === 'minimized' || props.view) ? false : ( 
  <button
    className='before'
    onClick={props.onClickBefore}
    role='button'
    disabled={props.startIndex <= 0}
  >
    <KeyboardArrowLeft classes={props.classes} />
  </button>
)

const NextButton = props => (props.modal === 'minimized' || props.view) ? false : (
  <button
    className='after'
    onClick={props.onClickAfter}
    role='button'
    disabled={(props.startIndex + 6) >= props.uploads.length}
  >
    <KeyboardArrowRight classes={props.classes} />
  </button>
)

const INC =  window.innerWidth >= 568 ? 6 : 1

class Grid extends React.Component {

  state = {
    startIndex: 0
  }

  onClickBefore = evt => {
    let { startIndex } = this.state
    evt.preventDefault()
    evt.stopPropagation()
    this.setState({ startIndex: Math.abs(startIndex - INC) })
  }

  onClickAfter = evt => {
    let { startIndex } = this.state
    evt.preventDefault()
    evt.stopPropagation()
    this.setState({ startIndex: startIndex + INC })
  }

  renderGridBody = () => {
    const { startIndex } = this.state
    const { view } = this.props
    const uploads = view ? [view] : [...this.props.uploads]
      .slice(startIndex, startIndex + INC)
    
    return uploads.map((upload, index) => (
      <Thumbnail
        index={index}
        key={index}
        {...upload}
        {...this.props}
      />)
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
    let { startIndex } = this.state
    const minimized = modal === 'minimized'
    return (
      <div className={
        classNames('s3-dropzone-modal-content', view ? 'full-width' : '')
      }>
        <PrevButton
          {...this.props}
          startIndex={startIndex}
          onClickBefore={this.onClickBefore}
        />
        <div
          className={classes.grid}
          style={{
            opacity: drag ? 0.5 : 1.0,
          }}
          ref={ref => { this.grid = ref }}
          >
          {!minimized && this.renderGridBody()}
        </div>
        <NextButton
          {...this.props}
          startIndex={startIndex}
          onClickAfter={this.onClickAfter}
        />
      </div>
    )
  }
}

Grid.defaultProps = {
  uploads: [],
  view: undefined
}

export default Grid
