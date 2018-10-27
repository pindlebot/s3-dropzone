"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _SvgIcon = _interopRequireDefault(require("../SvgIcon"));

var KeyboardArrowRight = function KeyboardArrowRight(props) {
  return _react.default.createElement(_SvgIcon.default, props, _react.default.createElement("path", {
    d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"
  }), _react.default.createElement("path", {
    d: "M0-.25h24v24H0z",
    fill: "none"
  }));
};

KeyboardArrowRight.defaultProps = {
  width: 24,
  height: 24,
  fill: '#fff'
};
var _default = KeyboardArrowRight;
exports.default = _default;