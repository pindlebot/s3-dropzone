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
      position: 'relative',
      WebkitTapHighlightColor: 'transparent',
      backgroundColor: 'transparent',
      outline: 'none',
      border: 0,
      margin: 0,
      padding: 0,
      cursor: 'pointer',
      userSelect: 'none',
      verticalAlign: 'middle',
      '-moz-appearance': 'none',
      '-webkit-appearance': 'none',
      textDecoration: 'none',
      // backgroundImage: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
      boxShadow: 'rgba(50, 50, 93, 0.109804) 0px 4px 6px 0px, rgba(0, 0, 0, 0.0784314) 0px 1px 3px 0px',
      borderRadius: '4px',
      fontSize: '16px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '.025em',
      // color: '#fafafa',
      justifyContent: 'space-around',
      width: '140px',
      height: '40px',
      backgroundImage: 'linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)',
      color: '#555'
    }
  }
}

export default Button