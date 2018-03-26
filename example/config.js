const defaultUploads = [
  'https://s3.amazonaws.com/s3-dropzone-example/static/agriculture-close-up-countryside-463052.jpg',
  'https://s3.amazonaws.com/s3-dropzone-example/static/asphalt-blur-camera-667341.jpg',
  'https://s3.amazonaws.com/s3-dropzone-example/static/astronomy-dark-dawn-573238.jpg',
  'https://s3.amazonaws.com/s3-dropzone-example/static/attractive-beautiful-beautiful-girl-799420.jpg'
].map(src => ({ src }))

export default {
  bucketName: 's3-dropzone-example',
  identityPoolId: 'us-east-1:ec98f845-271e-411b-950d-5530d96e7d94',
  uploads: defaultUploads,
  localStorageKey: '__uploads__'
}