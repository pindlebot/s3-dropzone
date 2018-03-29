import React from 'react'
import SvgIcon from '../SvgIcon'

const KeyboardArrowLeft = props => (
  <SvgIcon {...props}>
    <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
    <path d="M0-.5h24v24H0z" fill="none"/>
  </SvgIcon>
)

KeyboardArrowLeft.defaultProps = {
  width: 24,
  height: 24,
  fill: '#fff'
}

export default KeyboardArrowLeft