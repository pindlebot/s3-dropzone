import React from 'react'
import UploadIcon from './UploadIcon'

const Button = props => (
  <button {...props.button}>
    <UploadIcon />
    {props.children}
  </button>
)

Button.defaultProps = {
  children: 'Upload',
  button: {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      WebkitTapHighlightColor: 'transparent',
      backgroundColor: 'transparent',
      outline: 'none',
      border: 0,
      margin: 0,
      padding: '0 30px',
      cursor: 'pointer',
      userSelect: 'none',
      verticalAlign: 'middle',
      textDecoration: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      fontWeight: '400',
      textTransform: 'uppercase',
      letterSpacing: '.025em',
      color: '#fff',
      justifyContent: 'space-around',
      height: '48px',
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      color: 'white',
      width: '180px',
      WebkitFontSmoothing: 'antialiased',
      transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
      lineHeight: '1.4em',
      fontWeight: 500,
    }
  }
}

export default Button