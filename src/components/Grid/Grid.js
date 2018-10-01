import React from 'react'
import Thumbnail from '../Thumbnail'
import KeyboardArrowRight from '../icons/KeyboardArrowRight'
import KeyboardArrowLeft from '../icons/KeyboardArrowLeft'
import classNames from 'classnames'

const PrevButton = props => (props.modal === 'minimized' || props.view)
  ? false
  : (
    <button
      className='before'
      onClick={props.onClick}
      role='button'
      disabled={props.page <= 0}
    >
      <KeyboardArrowLeft classes={props.classes} />
    </button>
  )

const NextButton = props => (props.modal === 'minimized' || props.view)
  ? false
  : (
    <button
      className='after'
      onClick={props.onClick}
      role='button'
      disabled={props.page * props.gridSize >= props.uploads.length}
    >
      <KeyboardArrowRight classes={props.classes} />
    </button>
  )

class Grid extends React.Component {
  state = {
    page: 0
  }

  onClickPrev = evt => {
    evt.preventDefault()
    evt.stopPropagation()
    this.setState(prevState => ({
      page: prevState.page - 1
    }))
  }

  onClickNext = evt => {
    evt.preventDefault()
    evt.stopPropagation()
    this.setState(prevState => ({
      page: prevState.page + 1
    }))
  }

  renderGridBody = () => {
    const { page } = this.state
    const { view, gridSize } = this.props
    const startIndex = page * gridSize
    const uploads = view ? [view] : [...this.props.uploads]
      .slice(startIndex, startIndex + gridSize)

    return uploads.map((upload, index) => (
      <Thumbnail
        index={index * page}
        key={upload.id}
        page={page}
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
      className: classNameProp
    } = this.props
    console.log('grid', this.props)
    let { page } = this.state
    const minimized = modal === 'minimized'
    const className = classNames('dz-modal-content', view ? 'full-width' : '')
    return (
      <div className={className}>
        <PrevButton
          {...this.props}
          page={page}
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
          page={page}
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
