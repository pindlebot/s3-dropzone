export function handleDelete (s3) {
  return params => s3.deleteObject(params).promise()
}
