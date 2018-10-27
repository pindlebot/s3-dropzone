"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _SvgIcon = _interopRequireDefault(require("../SvgIcon"));

var Delete = function Delete(props) {
  return _react.default.createElement(_SvgIcon.default, props, _react.default.createElement("path", {
    d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
  }), _react.default.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }));
};

Delete.defaultProps = {
  width: 24,
  height: 24,
  fill: '#fff'
};
var _default = Delete;
exports.default = _default;