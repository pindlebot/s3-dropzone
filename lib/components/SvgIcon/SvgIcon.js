'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SvgIcon = function SvgIcon(props) {
  var titleAccess = props.titleAccess,
      children = props.children,
      classes = props.classes,
      other = (0, _objectWithoutProperties3.default)(props, ['titleAccess', 'children', 'classes']);

  return _react2.default.createElement(
    'svg',
    (0, _extends3.default)({
      className: classes.svgIcon,
      focusable: 'false',
      'aria-hidden': titleAccess ? 'false' : 'true'
    }, other),
    titleAccess ? _react2.default.createElement(
      'title',
      null,
      titleAccess
    ) : null,
    children
  );
};

SvgIcon.defaultProps = {
  color: 'inherit',
  viewBox: '0 0 24 24'
};

exports.default = SvgIcon;