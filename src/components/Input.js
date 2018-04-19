import React from 'react'

class Input extends React.Component {
  state = {
    value: ''
  }

  onChange = evt => this.setState({ value: evt.target.value })
  
  render () {

    return (
      <input 
        value={this.state.value}
        onChange={this.onChange}
        className='s3-dropzone-button-input'
      />
    )
  }
}

export default Input