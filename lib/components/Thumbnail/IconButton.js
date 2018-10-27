'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IconButton = function IconButton(props) {
  return _react2.default.createElement(
    'div',
    {
      className: props.classes.thumbnailOverlayIcon,
      onClick: function onClick(evt) {
        return props.onClick(evt, props.name, props.src);
      }
    },
    props.children
  );
};

exports.default = IconButton;