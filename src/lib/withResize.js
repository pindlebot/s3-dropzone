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
    this.props.dispatch({
      type: 'SET_WINDOW_CLICK',
      payload: true
    })
  }

  onWindowResize = ({ srcElement }) => {
    const width = srcElement.innerWidth
    const height = srcElement.innerHeight
    this.props.dispatch({
      type: 'SET_DIMENSIONS',
      payload: { width, height }
    })
  }

  onDragEnter = (evt) => {
    this.props.dispatch({
      type: 'SET_DRAG',
      payload: true
    })
  }

  onDragLeave = (evt) => {
    this.props.dispatch({
      type: 'SET_DRAG',
      payload: false
    })
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
