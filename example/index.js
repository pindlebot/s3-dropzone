import React from 'react'
import { render } from 'react-dom'
import { S3Dropzone } from '../src'
import 'whatwg-fetch'

const BASE_URI = 'http://nootacademy.com'

function createRelativeUrl (file) {
  let postId = 10000
  return `static/${postId}/${file.name}`
}

const UPLOADS = [
  'https://images.pexels.com/photos/600110/pexels-photo-600110.jpeg',
  'https://images.pexels.com/photos/286590/pexels-photo-286590.jpeg',
  'https://images.pexels.com/photos/710309/pexels-photo-710309.jpeg',
  'https://images.pexels.com/photos/600110/pexels-photo-600110.jpeg',
  //'https://images.pexels.com/photos/286590/pexels-photo-286590.jpeg',
  //'https://images.pexels.com/photos/710309/pexels-photo-710309.jpeg',
  //'https://images.pexels.com/photos/600110/pexels-photo-600110.jpeg',
  //'https://images.pexels.com/photos/286590/pexels-photo-286590.jpeg',
  //'https://images.pexels.com/photos/710309/pexels-photo-710309.jpeg'
].map(src => ({ src }))
const SRC = 'http://via.placeholder.com/350x150'

class App extends React.Component {
  render () {
    return (
      <div 
      className='container'
      style={{
        maxWidth: '660px',
        margin: '15vh auto'
      }}>
        <S3Dropzone
          getPayload={file => {
            const relativeUrl = createRelativeUrl(file)
            const key = encodeURIComponent(relativeUrl)
            return fetch(`${BASE_URI}/api/v1/presigned/${key}?type=${file.type}`)
          }}
          done={(err, data) => {
            if (err) {
              console.log(err)
            }
            const uploads = data.map(({ file, upload }) => ({
              url: 'http://www.nootacademy.com/api/v1/static/' + createRelativeUrl(file)
            }))
            S3Dropzone.store.update('plant', { uploads })
          }}
          uploads={UPLOADS}
        />
      </div>
    )
  }
}

render(
  <App />,
  document.getElementById('root')
)
