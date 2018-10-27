"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var SvgIcon = function SvgIcon(props) {
  var titleAccess = props.titleAccess,
      children = props.children,
      classes = props.classes,
      other = (0, _objectWithoutProperties2.default)(props, ["titleAccess", "children", "classes"]);
  return _react.default.createElement("svg", (0, _extends2.default)({
    className: classes.svgIcon,
    focusable: "false",
    "aria-hidden": titleAccess ? 'false' : 'true'
  }, other), titleAccess ? _react.default.createElement("title", null, titleAccess) : null, children);
};

SvgIcon.defaultProps = {
  color: 'inherit',
  viewBox: '0 0 24 24'
};
var _default = SvgIcon;
exports.default = _default;