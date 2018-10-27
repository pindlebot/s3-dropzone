import React from 'react'
import classNames from 'classnames'

export default class Dropzone extends React.Component {
  onDragOver = evt => {
    this.props.dispatch({
      type: 'SET_DRAG',
      payload: true
    })
    evt.stopPropagation()
    evt.preventDefault()
  }

  onDragLeave = (evt) => {
    this.props.dispatch({
      type: 'SET_DRAG',
      payload: false
    })
  }

  onDragEnter = (evt) => {}

  render () {
    const {
      theme,
      classes,
      className: classNameProp,
      dispatch,
      ...rest
    } = this.props
    const className = classNames(
      classes.dropzone,
      classNameProp
    )
    return (
      <div
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDrop={evt => {
          let files = Array.from(evt.dataTransfer.files)
          this.setState({
            drag: false
          }, () => {
            this.props.onDrop(files)
          })
          evt.preventDefault()
          evt.stopPropagation()
        }}
        onDragLeave={this.onDragLeave}
        className={className}
        style={theme.dropzone}
      >
        <input
          style={{
            display: 'none'
          }}
          type={'file'}
          ref={ref => {
            this.ref = ref
          }}
          onChange={evt => {
            this.props.onDrop(Array.from(this.ref.files))
          }}
        />
        {this.props.children}
      </div>
    )
  }
}