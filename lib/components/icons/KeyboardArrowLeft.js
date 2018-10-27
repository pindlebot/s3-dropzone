'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgIcon = require('../SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KeyboardArrowLeft = function KeyboardArrowLeft(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z' }),
    _react2.default.createElement('path', { d: 'M0-.5h24v24H0z', fill: 'none' })
  );
};

KeyboardArrowLeft.defaultProps = {
  width: 24,
  height: 24,
  fill: '#fff'
};

exports.default = KeyboardArrowLeft;