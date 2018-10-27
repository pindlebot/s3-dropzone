"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _SvgIcon = _interopRequireDefault(require("../SvgIcon"));

var Error = function Error(props) {
  return _react.default.createElement(_SvgIcon.default, props, _react.default.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), _react.default.createElement("path", {
    d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
  }));
};

Error.defaultProps = {
  width: 24,
  height: 24,
  fill: '#fff'
};
var _default = Error;
exports.default = _default;