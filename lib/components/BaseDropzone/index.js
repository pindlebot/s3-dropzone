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

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BaseDropzone(props) {
  var theme = props.theme,
      classes = props.classes,
      classNameProp = props.className,
      dispatch = props.dispatch,
      rest = (0, _objectWithoutProperties3.default)(props, ['theme', 'classes', 'className', 'dispatch']);

  var className = (0, _classnames2.default)(classes.dropzone, classNameProp);
  return _react2.default.createElement(_reactDropzone2.default, (0, _extends3.default)({
    className: className,
    style: theme.dropzone
  }, rest));
}

exports.default = BaseDropzone;