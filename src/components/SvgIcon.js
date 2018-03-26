import React from 'react'

const SvgIcon = props => {
  const {
    titleAccess,
    children,
    ...other
  } = props
  return (
    <svg
      focusable='false'
      aria-hidden={titleAccess ? 'false' : 'true'}
      {...other}>
      {titleAccess ? <title>{titleAccess}</title> : null}
      {children}
    </svg>
  )
}

SvgIcon.defaultProps = {
  color: 'inherit',
  viewBox: '0 0 24 24'
}

export default SvgIcon
