## s3-dropzone

s3-dropzone is a component that can be dropped in to any React project to enable uploading images and attachments to S3. 

### Installation

```bash
npm i s3-dropzone aws-sdk --save
```

Note: aws-sdk is required as a peer-dependency.

### Usage

```js
import React from 'react'
import { render } from 'react-dom'
import Dropzone from 's3-dropzone'
import 's3-dropzone/style.css'

const mapFileToParams = file => {
  let key = `static/${Math.round(Date.now() / 1000)}-${file.name}`
  return {
    Fields: {
      key: key,
      'Content-Type': file.type
    }
  }
}

render(
  <Dropzone
    region={AWS_REGION}
    identityPoolId={AWS_IDENTITY_POOL_ID}
    bucketName={AWS_S3_BUCKET_NAME}
    mapFileToParams={mapFileToParams}
  />,
  document.getElementById('root')
)

````

![https://raw.githubusercontent.com/unshift/s3-dropzone/master/screenshot.png](https://raw.githubusercontent.com/unshift/s3-dropzone/master/screenshot.png)

[Demo](http://s3-dropzone.herokuapp.com/)
