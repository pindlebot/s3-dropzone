import React from 'react'
import { render } from 'react-dom'
import { Dropzone } from '../src'
import 'whatwg-fetch'
import '../src/styles/main.scss'
import config from './config'
import './ribbon.css'

function getInitialState () {
  let uploads = config.uploads
  let data = window.localStorage.getItem(config.localStorageKey)
  if (data) {
    try {
      uploads = JSON.parse(data)
    } catch (err) {
      console.error(err)
    }
  }
  return uploads
}

const toUrl = (key) => `https://s3.amazonaws.com/${config.bucketName}/${key}`

class App extends React.Component {
  state = {
    uploads: getInitialState()
  }

  done = (err, data) => {
    if (err) {}
    let uploads = data.map(d => ({
      ...d, src: toUrl(d.key)
    })).concat([...this.state.uploads])
    this.update(uploads)
  }

  update = uploads => {
    this.setState({
      uploads
    }, () => {
      window.localStorage.setItem(
        config.localStorageKey,
        JSON.stringify(uploads)
      )
    })
  }

  render () {
    return (
      <Dropzone
        region='us-east-1'
        identityPoolId={config.identityPoolId}
        done={this.done}
        uploads={this.state.uploads}
        bucketName={config.bucketName}
        handleClick={(evt, type, upload) => {
          if (type !== 'delete') return
          let uploads = [...this.state.uploads].filter(u => u.id !== upload.id)
          this.update(uploads)
        }}
        tap={file => {
          let key = `static/${Math.round(Date.now() / 1000)}-${file.name}`
          return {
            Fields: {
              key: key,
              'Content-Type': file.type
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
