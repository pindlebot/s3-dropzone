const defaultUploads = [
  'https://images.pexels.com/photos/600110/pexels-photo-600110.jpeg',
  'https://images.pexels.com/photos/286590/pexels-photo-286590.jpeg',
  'https://images.pexels.com/photos/710309/pexels-photo-710309.jpeg',
].map(src => ({ src }))

export default {
  bucketName: 's3-dropzone-example',
  identityPoolId: 'us-east-1:ec98f845-271e-411b-950d-5530d96e7d94',
  uploads: [],
  localStorageKey: '__uploads__'
}