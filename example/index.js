import React from 'react'
import { render } from 'react-dom'
import { S3Dropzone } from '../src'
import 'whatwg-fetch'
import '../src/styles/main.scss'
import config from './config'

function getInitialState () {
  let uploads = config.uploads
  let data = window.localStorage.getItem(config.localStorageKey)
  if (data) {
    try {
      uploads = JSON.parse(data)
    } catch (err) {
      console.error (err)
    }
  }
  return uploads
}

class App extends React.Component {
  state = {
    uploads: getInitialState()
  }

  done = (err, data) => {
    if (err) {
    } 
    console.log('done()', data)
  }

  componentDidMount () {
    if (!this.timer) {
      //this.timer = setTimeout(() => {
      //  this.setState({ uploads: [] })
      //}, 3000)
    }
  }

  render () {
    console.log(this.state.uploads)
    return (
        <S3Dropzone
          region='us-east-1'
          identityPoolId={config.identityPoolId}
          done={this.done}
          uploads={this.state.uploads}
          bucketName={config.bucketName}
          onClick={(evt, type, upload) => {
            if (type !== 'delete') return
            let uploads = [...this.state.uploads].filter(u => u.src !== upload.src)
            window.localStorage.setItem(
              config.localStorageKey,
              JSON.stringify(uploads)
            )
          }}
          tap={file => {
            let uploads = [...this.state.uploads]
            let key = `static/${Math.round(Date.now() / 1000)}-${file.name}`
            let src = `https://s3.amazonaws.com/${config.bucketName}/${key}`
            uploads.unshift({ src, key, id: key })
            window.localStorage.setItem(
              config.localStorageKey,
              JSON.stringify(uploads)
            )
            return {
              Fields: {
                key: key,
                'Content-Type': file.type,
              }
            }
          }}
        />
    )
  }
}

render(
  <App />,
  document.getElementById('root')
)
