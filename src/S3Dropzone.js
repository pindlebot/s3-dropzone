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
    drag: false
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.uploads) {
      this.setState({ uploads: uploads })
    }
  }

  callback = (src) => {
    console.log(src)
  }

  onAttachmentMount = (previews) => {
    console.log(previews)
    const uploads = [...this.state.uploads].concat(previews)
    this.setState({ uploads, drag: false }, () => {
      console.log(this.state)
      this.props.onDrop(previews)
    })
  }

  done = (error, uploads) => {
    this.setState({ 
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

  onDragStart = (evt) => {
    console.log(evt)
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
            theme={theme} />
          <Button theme={theme} />
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