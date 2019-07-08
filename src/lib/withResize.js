import React from 'react'
import debounce from 'lodash.debounce'

const withResize = Component => class extends React.Component {
  componentDidMount = () => {
    setTimeout(() => window.addEventListener('click', this.onWindowClick))
    setTimeout(() => window.addEventListener('resize', debounce(this.onWindowResize, 200)))
  }

  componentWillUnmount = () => {
    window.removeEventListener('click', this.onWindowClick)
    window.removeEventListener('resize', this.onWindowResize)
  }

  onWindowClick = evt => {
    if (this.props.view) {
      this.props.setView(undefined)
    }
  }

  onWindowResize = ({ srcElement }) => {
    const width = srcElement.innerWidth
    const height = srcElement.innerHeight
    this.props.setDimensions({ width, height })
  }

  onDragEnter = (evt) => {
    this.props.setDrag(true)
  }

  onDragLeave = (evt) => {
    this.props.setDrag(false)
  }

  render () {
    return (
      <Component
        {...this.props}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
      />
    )
  }
}

export default withResize
