import React from 'react'
import Thumbnail from './components/Thumbnail'
import Button from './components/Button'
import SpinnerComponent from './components/SpinnerComponent'
import Dropzone from './components/Dropzone';
import sheet from './stylesheet'

class S3Dropzone extends React.Component {

  state = {
    loading: false,
    uploads: [],
    error: []
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.uploads) {
      this.setState({ uploads: uploads })
    }
  }

  onDrop = () => {
    this.setState({ loading: true }, () => {
      this.props.onDrop(this.state)
    })
  }

  done = (error, uploads) => {
    this.setState({ 
      loading: false,
      uploads: [...this.state.uploads].concat(uploads),
      error: error
    }, () => {
      this.props.done(error, uploads)
    })
  }

  componentDidMount = () => {
    if (!document.getElementById('spinnerStyles')) {
      let style = document.createElement('style')
      style.id = 'spinnerStyles'
      style.innerHTML = sheet
      document.querySelector('head').append(style)
    }
    
    if (this.props.uploads) {
      this.setState({ uploads: this.props.uploads })
    }
  }

  renderThumbnails = () => {
    const { uploads } = this.state
    return uploads.map((upload, i) =>
      <Thumbnail
        key={i}
        img={{...upload, ...Thumbnail.defaultProps.img}}
      />
    )
  }

  render() {
    const {
      thumbnailsContainer,
      onDrop,
      done,
      spinner,
      uploads,
      ...rest
    } = this.props
    const { loading } = this.state
    return (
      <Dropzone
        {...rest}
        >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '100%'
        }}>
          {loading
            ? <SpinnerComponent />
            : <div {...thumbnailsContainer}>{this.renderThumbnails()}</div>
          }
          <Button />
        </div>
      </Dropzone>
    )
  }
}

S3Dropzone.defaultProps = {
  thumbnailsContainer: {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(25%, 1fr))',
      gridAutoRows: '150px',
      overflow: 'scroll',
      gridGap: '10px 10px',
      marginBottom: '5%'
    }
  },
  done: () => {},
  onDrop: () => {},
}

export default S3Dropzone