"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var IconButton = function IconButton(props) {
  return _react.default.createElement("div", {
    className: props.classes.thumbnailOverlayIcon,
    onClick: function onClick(evt) {
      return props.onClick(evt, props.name, props.src);
    }
  }, props.children);
};

var _default = IconButton;
exports.default = _default;