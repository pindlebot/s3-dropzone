'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SpinnerComponent = function SpinnerComponent(props) {
  return _react2.default.createElement(
    'div',
    { className: 'sk-circle' },
    _react2.default.createElement('div', { className: 'sk-circle1 sk-child' }),
    _react2.default.createElement('div', { className: 'sk-circle2 sk-child' }),
    _react2.default.createElement('div', { className: 'sk-circle3 sk-child' }),
    _react2.default.createElement('div', { className: 'sk-circle4 sk-child' }),
    _react2.default.createElement('div', { className: 'sk-circle5 sk-child' }),
    _react2.default.createElement('div', { className: 'sk-circle6 sk-child' }),
    _react2.default.createElement('div', { className: 'sk-circle7 sk-child' }),
    _react2.default.createElement('div', { className: 'sk-circle8 sk-child' }),
    _react2.default.createElement('div', { className: 'sk-circle9 sk-child' }),
    _react2.default.createElement('div', { className: 'sk-circle10 sk-child' }),
    _react2.default.createElement('div', { className: 'sk-circle11 sk-child' }),
    _react2.default.createElement('div', { className: 'sk-circle12 sk-child' })
  );
};

SpinnerComponent.defaultProps = {
  show: false
};

exports.default = SpinnerComponent;