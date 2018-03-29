import React from 'react'
import createStore from './'

const initialState = {
  uploads: [],
  visible: true
}

export default Component =>
  class Wrapper extends React.Component {
    static defaultProps = {
      ...initialState
    }

    state = {
      ...initialState
    }

    static store = createStore()

    componentDidMount = () => {
      Wrapper.store.subscribe('uploads', this.setUploads)
      Wrapper.store.update('uploads', this.props.uploads)

      Wrapper.store.subscribe('visible', this.setVisibility)
    }

    componentWillUnmount = () => {
      Wrapper.store.unsubscribe('uploads')
      Wrapper.store.unsubscribe('visible')
    }

    componentWillReceiveProps = (nextProps) => {
      if (nextProps.uploads) {
        Wrapper.store.update('uploads', nextProps.uploads)
      }
      if (nextProps.hasOwnProperty('visible')) {
        Wrapper.store.update('visible', nextProps.visible)
      }
    }

    setUploads = (uploads) => {
      console.log('setUploads', uploads)
      this.setState({ uploads })
    }

    setVisibility = (visible) => {
      this.setState({ visible })
    }

    render () {
      return (
        <Component
          {...this.props}
          uploads={this.state.uploads}
          visible={this.state.visible}
          store={Wrapper.store}
        />
      )
    }
  }
