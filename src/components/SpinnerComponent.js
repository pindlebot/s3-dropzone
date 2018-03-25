import React from 'react'

const SpinnerComponent = props => (
  <div className='spinner' style={props.styles.spinnerContainerStyles} >
    <div className='bounce1' style={props.styles.spinnerStyles} />
    <div className='bounce2' style={props.styles.spinnerStyles} />
    <div className='bounce3' style={props.styles.spinnerStyles} />
  </div>
)

SpinnerComponent.defaultProps = {
  styles: {
    spinnerStyles: {
      width: '18px',
      height: '18px',
      backgroundImage: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)'
    },
    spinnerContainerStyles: {}
  }
}

export default SpinnerComponent
