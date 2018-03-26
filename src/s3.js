import AWS from 'aws-sdk'

export default ({ region, identityPoolId}) => {
  AWS.config.region = region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: identityPoolId
  })
  return new AWS.S3()
}