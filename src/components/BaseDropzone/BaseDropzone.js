import React from 'react'
import classNames from 'classnames'

const style = {
  display: 'none'
}

class BaseDropzone extends React.Component {
  onDragOver = evt => {
    this.props.setDrag(true)
    evt.stopPropagation()
    evt.preventDefault()
  }

  onDragLeave = (evt) => {
    this.props.setDrag(false)
  }

  onDragEnter = (evt) => {}

  onDrop = evt => {
    const files = Array.from(evt.dataTransfer.files)
    this.setState({
      drag: false
    }, () => {
      this.props.onDrop(files)
    })
    evt.preventDefault()
    evt.stopPropagation()
  }

  onChange = evt => {
    this.props.onDrop(Array.from(this.ref.files))
  }

  render () {
    const {
      theme,
      classes,
      className: classNameProp,
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
        onDrop={this.onDrop}
        onDragLeave={this.onDragLeave}
        className={className}
        style={theme.dropzone}
      >
        <input
          style={style}
          type={'file'}
          ref={ref => {
            this.ref = ref
          }}
          onChange={this.onChange}
        />
        {this.props.children}
      </div>
    )
  }
}

export default BaseDropzone
