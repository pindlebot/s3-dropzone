import React from 'react'
import Thumbnail from './components/Thumbnail'
import Button from './components/Button'
import SpinnerComponent from './components/SpinnerComponent'
import Dropzone from './Dropzone';

class DropzoneContent extends React.Component {

  renderThumbnails = () => {
    const {
      uploads,
    } = this.props
    return uploads.map((upload, i) =>
      <Thumbnail
        img={{...upload, ...Thumbnail.defaultProps.img}}
        figure={{
          width: `calc(${100 / uploads.length}% - 10px)`,
          margin: '0',
          overflow: 'hidden'
        }}
      />
    )
  }

  render() {
    const {
      thumbnailsContainer,
      buttonContainer,
      loading
    } = this.props
    return (
      <React.Fragment>
        {loading
          ? spinner
          : <div {...thumbnailsContainer}>{this.renderThumbnails()}</div>
        }
        <div {...buttonContainer}><Button /></div>
      </React.Fragment>
    )
  }
}

DropzoneContent.defaultProps = {
  buttonContainer: {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end'
    }
  },
  thumbnailsContainer: {
    style: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      height: '100%',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      flexBasis: '60%'
    }
  }
}