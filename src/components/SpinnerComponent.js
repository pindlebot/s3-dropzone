import React from 'react'

const SpinnerComponent = props => (
  <div className='s3-dropzone-thumbnail-overlay s3-dropzone-spinner' style={{
    ...props.style,
    visibility: props.show ? 'visible': 'hidden'
  }}>
    <div className="sk-circle">
      <div className="sk-circle1 sk-child"></div>
      <div className="sk-circle2 sk-child"></div>
      <div className="sk-circle3 sk-child"></div>
      <div className="sk-circle4 sk-child"></div>
      <div className="sk-circle5 sk-child"></div>
      <div className="sk-circle6 sk-child"></div>
      <div className="sk-circle7 sk-child"></div>
      <div className="sk-circle8 sk-child"></div>
      <div className="sk-circle9 sk-child"></div>
      <div className="sk-circle10 sk-child"></div>
      <div className="sk-circle11 sk-child"></div>
      <div className="sk-circle12 sk-child"></div>
    </div>
  </div>
)

SpinnerComponent.defaultProps = {
  show: false
}

export default SpinnerComponent
