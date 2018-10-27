"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _SvgIcon = _interopRequireDefault(require("../SvgIcon"));

var KeyboardArrowLeft = function KeyboardArrowLeft(props) {
  return _react.default.createElement(_SvgIcon.default, props, _react.default.createElement("path", {
    d: "M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"
  }), _react.default.createElement("path", {
    d: "M0-.5h24v24H0z",
    fill: "none"
  }));
};

KeyboardArrowLeft.defaultProps = {
  width: 24,
  height: 24,
  fill: '#fff'
};
var _default = KeyboardArrowLeft;
exports.default = _default;