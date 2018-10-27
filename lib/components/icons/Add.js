"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _SvgIcon = _interopRequireDefault(require("../SvgIcon"));

var Add = function Add(props) {
  return _react.default.createElement(_SvgIcon.default, props, _react.default.createElement("path", {
    d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
  }), _react.default.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }));
};

Add.defaultProps = {
  width: 24,
  height: 24,
  fill: '#fff'
};
var _default = Add;
exports.default = _default;