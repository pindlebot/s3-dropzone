import React from 'react'
import URL_REGEX from '../../url'

const Button = props => (
  <button
    className='dz-button'
    style={props.theme.button}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    {props.children}
  </button>
)

class ButtonWithInput extends React.Component {
  state = {
    value: ''
  }

  onChange = evt => this.setState({ value: evt.target.value })
  
  render () {
    return (
      <div
        className='dz-input-group'
      >
        <input 
          value={this.state.value}
          onChange={this.onChange}
          className='dz-button-input'
        />
        <Button
          {...this.props} 
          disabled={!(this.state.value && URL_REGEX.test(this.state.value))}
          onClick={evt => {
            evt.preventDefault()
            evt.stopPropagation()
            this.props.onClick(this.state.value)
          }}
        >
          Upload
        </Button>
      </div>
    )
  }
}

export default ButtonWithInput
