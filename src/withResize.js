import React from 'react'
import debounce from 'lodash.debounce'

const getInitialState = () => typeof window !== 'undefined' ? ({
  width: window.innerWidth,
  height: window.innerHeight,
  windowClick: false,
  drag: false
}) : ({ windowClick: false, height: 0, width: 0, drag: false })

const withResize = Component => class extends React.Component {
  state = getInitialState()

  componentDidMount = () => {
    setTimeout(() => { window.addEventListener('click', this.onWindowClick) })
    setTimeout(() => { window.addEventListener('resize', debounce(this.onWindowResize, 200)) })
  }

  componentWillUnmount = () => {
    window.removeEventListener('click', this.onWindowClick)
    window.removeEventListener('resize', this.onWindowResize)
  }

  onWindowClick = evt => {
    this.setState({ windowClick: true })
  }

  onWindowResize = ({ srcElement }) => {
    const width = srcElement.innerWidth
    const height = srcElement.innerHeight
    this.setState({ width, height })
  }

  onDragEnter = (evt) => {
    this.setState({ drag: true })
  }

  onDragLeave = (evt) => {
    this.setState({ drag: false })
  }

  render () {
    return (
      <Component
        {...this.props}
        {...this.state}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
      />
    )
  }
}

export default withResize
