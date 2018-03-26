import React from 'react'
import { render } from 'react-dom'
import { S3Dropzone } from '../src'
import 'whatwg-fetch'
import '../src/style.css'

const BASE_URI = 'http://nootacademy.com'

let postId = Math.floor(Math.random() * 1e6)

const createRelativeUrl = (file) => `static/${postId}/${file.name}`

function getInitialState () {
  let uploads = UPLOADS
  let data = window.localStorage.getItem('__uploads__')
  if (data) {
    try {
      uploads = JSON.parse(data)
    } catch (err) {
      console.error (err)
    }
  }
  return uploads
}

const UPLOADS = [
  'https://images.pexels.com/photos/600110/pexels-photo-600110.jpeg',
  'https://images.pexels.com/photos/286590/pexels-photo-286590.jpeg',
  'https://images.pexels.com/photos/710309/pexels-photo-710309.jpeg',
].map(src => ({ src }))

class App extends React.Component {
  state = {
    uploads: getInitialState()
  }

  getPayload = (file) => {
    const key = encodeURIComponent(`static/${postId}/${file.name}`)
    const uploads = [...this.state.uploads]
    uploads.push({ url: 'http://www.nootacademy.com/api/v1/static/' + key })
    window.localStorage.setItem('__uploads__', JSON.stringify(uploads))
    return fetch(`${BASE_URI}/api/v1/presigned/${key}?type=${file.type}`)
  }

  done = (err, data) => {
    if (err) {
      console.error(err)
    } 
    console.log('done()', data)
  }

  render () {
    
    return (
      <div 
      className='container'
      style={{
        maxWidth: '660px',
        margin: '15vh auto'
      }}>
        <S3Dropzone
          getPayload={this.getPayload}
          done={this.done}
          uploads={this.state.uploads}
        />
      </div>
    )
  }
}

render(
  <App />,
  document.getElementById('root')
)
