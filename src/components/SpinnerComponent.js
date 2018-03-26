import React from 'react'

const SpinnerComponent = props => (
  <div className='spinner' style={props.theme.spinnerContainer}>
    <div className='bounce1' style={props.theme.spinner} />
    <div className='bounce2' style={props.theme.spinner} />
    <div className='bounce3' style={props.theme.spinner} />
  </div>
)

SpinnerComponent.defaultProps = {}

export default SpinnerComponent
