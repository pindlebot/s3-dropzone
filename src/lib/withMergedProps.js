import React from 'react'
import shallowEqual from 'fbjs/lib/shallowEqual'

const merge = (nextProps, prevState) => {
  const props = { ...prevState }
  return Object.keys(nextProps)
    .filter(propKey => typeof nextProps[propKey] !== 'function')
    .reduce((acc, propKey) => {
      acc[propKey] = nextProps[propKey]
      return acc
    }, props)
}

const withMergedProps = initialState => Component => class extends React.Component {
  state = {
    ...initialState
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const merged = merge(nextProps, prevState)
    return shallowEqual(prevState, merged) ? null : merged
  }

  dispatch = state => {
    this.setState(state)
  }

  render () {
    return (
      <Component {...this.props} {...this.state} dispatch={this.dispatch} />
    )
  }
}

export default withMergedProps
