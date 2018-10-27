"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _reactDropzone = _interopRequireDefault(require("react-dropzone"));

var _classnames = _interopRequireDefault(require("classnames"));

function BaseDropzone(props) {
  var theme = props.theme,
      classes = props.classes,
      classNameProp = props.className,
      dispatch = props.dispatch,
      rest = (0, _objectWithoutProperties2.default)(props, ["theme", "classes", "className", "dispatch"]);
  var className = (0, _classnames.default)(classes.dropzone, classNameProp);
  return _react.default.createElement(_reactDropzone.default, (0, _extends2.default)({
    className: className,
    style: theme.dropzone
  }, rest));
}

var _default = BaseDropzone;
exports.default = _default;