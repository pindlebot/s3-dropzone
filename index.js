import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import fetch from 'isomorphic-fetch'
import Spinner from '../../../components/Spinner'

const BASE_URI = 'https://s3.amazonaws.com/monograph-dev-deploymentbucket-hn9csyre4qrj'

class EditorDropzone extends React.Component {
  static propTypes = {
    post: PropTypes.object,
    disableClick: PropTypes.bool
  }

  state = { loading: false, images: [] }

  setUploadState = (loading, image = null) => {
    let { images } = this.state
    if (image) images.push(image)
    return new Promise((resolve, reject) => {
      this.setState({ loading, images }, resolve)
    })
  }

  onDrop = async (files) => {
    await this.setUploadState(true)
    const file = files[0]
    let { type } = file
    type = encodeURIComponent(type)
    let postId = this.props.post.Post.id
    const key = encodeURIComponent(`static/${postId}/${file.name}`)
    let payload = await fetch(`/api/v1/presigned/${key}?type=${type}`)
      .then(resp => resp.json())
    const formData = new window.FormData()
    for (let field in payload.fields) {
      formData.append(field, payload.fields[field])
    }
    formData.append('file', file)
    try {
      await fetch(payload.url, {
        method: 'POST',
        body: formData
      })
    } catch (err) {
      console.log(err)
    }
    let { id } = this.props.post.Post
    let url = `/static/${id}/${file.name}`
    this.props.createImage({ postId: id, url: url })
    await this.setUploadState(false, url)
  }

  renderThumbnails = () => (
    <div className='thumbnail-wrapper'>
      {this.state.images.map(url =>
        <img className='thumbnail' src={url} style={{margin: '1em'}} />)
      }
    </div>
  )

  renderSpinner () {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <SpinnerAdornment />
      </div>
    )
  }

  render () {
    const {
      disableClick,
      className
    } = this.props
    let { images } = this.state
    return (
      <Dropzone
        disableClick={disableClick}
        onDrop={this.onDrop}
        className={className}
      >
        {images.length
          ? this.renderThumbnails()
          : (this.state.loading
            ? <div><Spinner /></div>
            : <div />)}
      </Dropzone>
    )
  }
}

EditorDropzone.defaultProps = {
  disableClick: false
}

export default EditorDropzone