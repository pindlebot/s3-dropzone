import React from 'react'
import Thumbnail from './Thumbnail'
import KeyboardArrowRight from './icons/KeyboardArrowRight'
import KeyboardArrowLeft from './icons/KeyboardArrowLeft'
import classNames from 'classnames'

const PrevButton = props => (props.modal === 'minimized' || props.view) ? false : (
  <button
    className='before'
    onClick={props.onClick}
    role='button'
    disabled={props.index <= 0}
  >
    <KeyboardArrowLeft classes={props.classes} />
  </button>
)

const NextButton = props => (props.modal === 'minimized' || props.view) ? false : (
  <button
    className='after'
    onClick={props.onClick}
    role='button'
    disabled={(props.index + props.gridSize) >= props.uploads.length}
  >
    <KeyboardArrowRight classes={props.classes} />
  </button>
)

class Grid extends React.Component {
  state = {
    index: 0
  }

  onClickPrev = evt => {
    let { index } = this.state
    evt.preventDefault()
    evt.stopPropagation()
    this.setState({ index: Math.abs(index - this.props.gridSize) })
  }

  onClickNext = evt => {
    let { index } = this.state
    evt.preventDefault()
    evt.stopPropagation()
    this.setState({ index: index + this.props.gridSize })
  }

  renderGridBody = () => {
    const { index } = this.state
    const { view } = this.props
    const uploads = view ? [view] : [...this.props.uploads]
      .slice(index, index + this.props.gridSize)

    return uploads.map((upload, index) => (
      <Thumbnail index={index} key={index} {...upload} {...this.props} />)
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
    let { index } = this.state
    const minimized = modal === 'minimized'
    return (
      <div className={classNames('dz-modal-content', view ? 'full-width' : '')}>
        <PrevButton
          {...this.props}
          index={index}
          onClick={this.onClickPrev}
        />
        <div
          className={classes.grid}
          style={{
            opacity: drag ? 0.5 : 1.0
          }}
          ref={ref => { this.grid = ref }}
        >
          {!minimized && this.renderGridBody()}
        </div>
        <NextButton
          {...this.props}
          index={index}
          onClick={this.onClickNext}
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
