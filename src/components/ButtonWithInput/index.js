import React from 'react'
import Button from '../Button'

class ButtonWithInput extends React.Component {
  state = {
    value: ''
  }

  onChange = evt => this.setState({ value: evt.target.value })
  
  render () {
    console.log(this.props)
    return (
      <div
        onClick={evt => {
          evt.preventDefault()
          evt.stopPropagation()
        }}
        className='s3-dropzone-input-group'
      >
        <input 
          value={this.state.value}
          onChange={this.onChange}
          className='s3-dropzone-button-input'
        />
        <Button
          {...this.props} 
          onClick={evt => {
            evt.preventDefault()
            evt.stopPropagation()
            this.props.onClick(this.state.value)
          }}
        />
      </div>
    )
  }
}

export default ButtonWithInput
