'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Thumbnail = exports.Dropzone = undefined;

var _Dropzone = require('./components/Dropzone');

Object.defineProperty(exports, 'Dropzone', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Dropzone).default;
  }
});

var _Thumbnail = require('./components/Thumbnail');

Object.defineProperty(exports, 'Thumbnail', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Thumbnail).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Dropzone.Dropzone;