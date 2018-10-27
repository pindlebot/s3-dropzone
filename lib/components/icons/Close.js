"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _SvgIcon = _interopRequireDefault(require("../SvgIcon"));

var Close = function Close(props) {
  return _react.default.createElement(_SvgIcon.default, props, _react.default.createElement("path", {
    d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
  }), _react.default.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }));
};

Close.defaultProps = {
  width: 24,
  height: 24,
  fill: '#fff'
};
var _default = Close;
exports.default = _default;