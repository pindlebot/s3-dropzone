import React from 'react'
import Thumbnail from './Thumbnail'
import theme from '../theme'
import Button from './Button'
import KeyboardArrowRight from './icons/KeyboardArrowRight'
import KeyboardArrowLeft from './icons/KeyboardArrowLeft'

class Grid extends React.Component {

  state = {
    startIndex: 0
  }

  onClickBefore = evt => {
    let { startIndex } = this.state
    evt.preventDefault()
    evt.stopPropagation()
    this.setState({ startIndex: Math.abs(startIndex - 6) })
  }

  onClickAfter = evt => {
    let { startIndex } = this.state
    evt.preventDefault()
    evt.stopPropagation()
    this.setState({ startIndex: startIndex + 6 })
  }

  render () {
    const { 
      drag,
      view,
      classes,
    } = this.props
    let uploadsTheme = this.props.theme.uploads
    let { startIndex } = this.state
    let uploads = [...this.props.uploads]
      .slice(startIndex, startIndex + 6)
    if (view) {
      //uploadsTheme.gridTemplateColumns = '1fr'
      //uploadsTheme.gridAutoRows = 'auto'
      uploads = [view]
    } else {
      //uploadsTheme.gridTemplateColumns = '1fr 1fr 1fr'
      //uploadsTheme.gridAutoRows = 'minmax(150px, 50%)'
    }
    
    return (
      <div
        className={view ? 's3-dropzone-grid-view' : classes.grid}
        style={{
          ...uploadsTheme,
          opacity: drag ? 0.5 : 1.0
        }}>
        <button
          className='before'
          onClick={this.onClickBefore}
          role='button'
          disabled={this.state.startIndex <= 0}
          >
          <KeyboardArrowLeft classes={this.props.classes} />
        </button>
        {uploads.map((upload, i) => {
          const { loading, ...rest } = upload
          let key = upload.id || upload.key
          return (<Thumbnail
            loading={loading}
            index={i}
            key={key}
            img={{
              ...rest,
              'data-s3-key': key
            }}
            {...this.props}
          />)
        }
      )}
        <button
          className='after'
          onClick={this.onClickAfter}
          role='button'
          disabled={(this.state.startIndex + 6) >= this.props.uploads.length}
          >
          <KeyboardArrowRight classes={this.props.classes} />
        </button>
        {!view && 
          <React.Fragment>
            <div></div>
            <div className={this.props.classes.buttonContainer}>
              <div className='s3-dropzone-button-container-inner'>
                <Button theme={this.props.theme} classes={this.props.classes} />
              </div>
            </div>
            <div></div>
          </React.Fragment>
         }
      </div>
    )
  }
}

Grid.defaultProps = {
  uploads: [],
  view: undefined
}

export default Grid
