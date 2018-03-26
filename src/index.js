import S3Dropzone from './S3Dropzone'
import Thumbnail from './components/Thumbnail'
import Button from './components/Button'
import SpinnerComponent from './components/SpinnerComponent'
import BaseDropzone from './components/BaseDropzone'
import registerServiceWorker from './registerServiceWorker'

exports.S3Dropzone = S3Dropzone
exports.Button = Button
exports.Thumbnail = Thumbnail
exports.SpinnerComponent = SpinnerComponent
exports.BaseDropzone  = BaseDropzone

export default {
  S3Dropzone,
  Button,
  Thumbnail,
  SpinnerComponent,
  BaseDropzone,
  registerServiceWorker
}