import React from 'react'
import createStore from './'

const initialState = {
  loading: false,
  uploads: []
}

export default Component =>
  class Wrapper extends React.Component {
    static defaultProps = {
      ...initialState
    }

    static store = createStore()

    componentDidMount = () => {
      Wrapper.store.subscribe('plant', this.plant)
    }

    componentWillUnmount = () => {
      Wrapper.store.unsubscribe('plant')
    }

    componentWillReceiveProps = (nextProps) => {
      Wrapper.store.update('plant', nextProps)
    }

    plant = (state) => {
      this.setState({ ...this.state, ...state })
    }

    render () {
      return (<Component {...this.props} {...this.state} store={Wrapper.store} />)
    }
  }
