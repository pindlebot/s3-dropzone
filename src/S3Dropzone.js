import React from 'react'
import Thumbnail from './components/Thumbnail'
import Button from './components/Button'
import SpinnerComponent from './components/SpinnerComponent'
import Dropzone from './components/Dropzone';
import sheet from './stylesheet'
import Uploads from './components/Uploads'
import theme from './theme'


class S3Dropzone extends React.Component {

  state = {
    loading: false,
    uploads: [],
    error: [],
    drag: false,
    view: undefined
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

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.uploads) {
      this.setState({ uploads: uploads })
    }
  }

  onClick = (evt, type, index) => {
    evt.preventDefault()
    switch (type) {
      case 'delete':
        let uploads = [...this.state.uploads]
        uploads.splice(index, 1)
        this.setState({ uploads })
        break
      case 'view':
        this.setState({ view: this.state.uploads[index] })
        break
      case 'close':
        this.setState({ view: undefined })
        break
      default:
    }
  }

  onAttachmentMount = (previews) => {
    const uploads = [...this.state.uploads].concat(previews)
    this.setState({ uploads, drag: false }, () => {
      this.props.onDrop(previews)
    })
  }

  done = (error, uploads) => {
    this.setState({ 
      uploads: [...this.state.uploads]
        .map(u => ({ ...u, loading: false })),
      error: error
    }, () => {
      this.props.done(error, uploads)
    })
  }

  onDragStart = (evt) => {
    this.setState({ drag: true })
  }

  onDragEnd = () => {
    this.setState({ drag: false })
  }

  render() {
    const {
      thumbnailsContainer,
      done,
      spinner,
      uploads,
      theme,
      ...rest
    } = this.props
    const { loading } = this.state
    if (this.state.view) {
      return (
        <Uploads 
          {...this.props}
          uploads={this.state.uploads}
          drag={this.state.drag}
          theme={theme}
          onClick={this.onClick}
          view={this.state.view}
        />
      )
    }
    return (
      <Dropzone
        {...rest}
        onDragEnter={this.onDragStart}
        onDragLeave={this.onDragEnd}
        className={this.state.drag ? 'drag' : undefined}
        draggable='true'
        theme={theme}
        onAttachmentMount={this.onAttachmentMount}
        >
        <div 
          style={theme.content}>
          <Uploads 
            {...this.props}
            uploads={this.state.uploads}
            drag={this.state.drag}
            theme={theme}
            onClick={this.onClick}
            view={this.state.view}
          />
          <div style={{
            display: 'flex',
            flexBasis: '20%',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
            <Button theme={theme} />
          </div>
        </div>
      </Dropzone>
    )
  }
}

S3Dropzone.defaultProps = {
  done: () => {},
  onDrop: () => {},
  theme: theme
}

export default S3Dropzone