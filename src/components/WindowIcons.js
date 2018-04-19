import React from 'react'
import SvgIcon from './SvgIcon'

export const CloseIcon = props => (
  <SvgIcon {...props}>
    <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
      <g id='red' transform='translate(-20.000000, -19.000000)' fill='#4D0000'>
        <g id='red-set' transform='translate(14.000000, 18.000000)'>
          <rect id='Rectangle' transform='translate(35.000000, 30.454545) rotate(45.000000) translate(-35.000000, -30.454545) ' x='-1.36363636' y='25.9090909' width='72.7272727' height='9.09090909' />
          <rect id='Rectangle' transform='translate(35.000000, 30.454545) scale(1, -1) rotate(45.000000) translate(-35.000000, -30.454545) ' x='-1.36363636' y='25.9090909' width='72.7272727' height='9.09090909' />
        </g>
      </g>
    </g>
  </SvgIcon>
)

CloseIcon.defaultProps = {
  width: '7px',
  height: '7px',
  viewBox: '0 0 58 59',
  classes: { svgIcon: '' }
}

export const MinimizeIcon = props => (
  <SvgIcon {...props}>
    <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
      <g id='yellow' transform='translate(-14.000000, -46.000000)' fill='#995700'>
        <g id='yellow-set' transform='translate(14.000000, 46.000000)'>
          <rect id='Rectangle' x='0' y='0' width='72.7272727' height='9.09090909' />
        </g>
      </g>
    </g>
  </SvgIcon>
)

MinimizeIcon.defaultProps = {
  viewBox: '0 0 73 10',
  width: '7px',
  height: '7px',
  classes: { svgIcon: '' }
}

export const MaximizeIcon = props => (
  <SvgIcon {...props}>
    <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
      <g id='green' transform='translate(-24.000000, -24.000000)' fill='#006500'>
        <g id='green-set' transform='translate(24.000000, 24.000000)'>
          <path d='M51.7564103,1.00779537 L51.8411287,42.5897436 L10.174462,0.923076923 L51.7564103,1.00779537 Z M1.00779537,51.7564103 L0.923076923,10.174462 L42.5897436,51.8411287 L1.00779537,51.7564103 Z' id='Combined-Shape' />
        </g>
      </g>
    </g>
  </SvgIcon>
)

MaximizeIcon.defaultProps = {
  viewBox: '0 0 52 52',
  width: '7px',
  height: '7px',
  classes: { svgIcon: '' }
}
