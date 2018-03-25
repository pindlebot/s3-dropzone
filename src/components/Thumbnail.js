import React from 'react'

const Thumbnail = props => (
  <figure {...props.figure}>
    <img {...props.img} />
  </figure>
)

Thumbnail.defaultProps = {
  img: {
    style: {
      boxShadow: '0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.3)',
      width: '100%'
    }
  },
  figure: {
    style: {
      margin: '0',
      overflow: 'hidden'
    }
  }
}

export default Thumbnail