"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Dropzone", {
  enumerable: true,
  get: function get() {
    return _Dropzone.default;
  }
});
Object.defineProperty(exports, "Thumbnail", {
  enumerable: true,
  get: function get() {
    return _Thumbnail.default;
  }
});
exports.default = void 0;

var _Dropzone = _interopRequireWildcard(require("./components/Dropzone"));

var _Thumbnail = _interopRequireDefault(require("./components/Thumbnail"));

var _default = _Dropzone.Dropzone;
exports.default = _default;