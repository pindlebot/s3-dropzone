import AWS from 'aws-sdk'

export default ({ region, identityPoolId, bucketName }) => {
  AWS.config.region = region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: identityPoolId
  })
  const s3 = new AWS.S3()

  const remove = (key, bucket = bucketName) => s3.deleteObject({
    Bucket: bucket,
    Key: key
  }).promise()

  const presign = params => new Promise((resolve, reject) => {
    if (!params.Bucket) {
      params.Bucket = bucketName
    }
    s3.createPresignedPost(params, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })

  const post = (file, payload, params = {}) => {
    const formData = new window.FormData()
    for (let field in payload.fields) {
      formData.append(field, payload.fields[field])
    }
    formData.append('file', file)
    return fetch(payload.url, {
      method: 'POST',
      body: formData,
      ...params
    })
  }

  const putObject = params => s3.putObject({ Bucket: bucketName, ...params }).promise()

  return {
    remove,
    presign,
    post,
    putObject
  }
}
