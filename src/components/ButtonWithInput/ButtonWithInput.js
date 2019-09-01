import React from 'react'
import URL_REGEX from '../../lib/url'

function Button (props) {
  return (
    <button
      className='dz-button'
      style={props.theme.button}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

function ButtonWithInput (props) {
  const [value, setValue] = React.useState('')
  const [disabled, setDisabled] = React.useState(false)

  const onChange = evt => {
    const { target: { value } } = evt
    setValue(value)

    if (!disabled) {
      if (URL_REGEX.test(value)) {
        setDisabled(true)
      }
    }
  }

  const handleClick = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    props.onClick(value)
  }

  return (
    <div
      className='dz-input-group'
    >
      <input
        value={value}
        onChange={onChange}
        className='dz-button-input'
      />
      <Button
        {...props}
        disabled={disabled}
        onClick={handleClick}
      >
        Upload
      </Button>
    </div>
  )
}

export default ButtonWithInput
