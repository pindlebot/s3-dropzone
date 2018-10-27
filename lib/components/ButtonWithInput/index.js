'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _url = require('../../lib/url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = function Button(props) {
  return _react2.default.createElement(
    'button',
    {
      className: 'dz-button',
      style: props.theme.button,
      onClick: props.onClick,
      disabled: props.disabled
    },
    props.children
  );
};

var ButtonWithInput = function (_React$Component) {
  (0, _inherits3.default)(ButtonWithInput, _React$Component);

  function ButtonWithInput() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ButtonWithInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ButtonWithInput.__proto__ || (0, _getPrototypeOf2.default)(ButtonWithInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      value: ''
    }, _this.onChange = function (evt) {
      return _this.setState({ value: evt.target.value });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ButtonWithInput, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        {
          className: 'dz-input-group'
        },
        _react2.default.createElement('input', {
          value: this.state.value,
          onChange: this.onChange,
          className: 'dz-button-input'
        }),
        _react2.default.createElement(
          Button,
          (0, _extends3.default)({}, this.props, {
            disabled: !(this.state.value && _url2.default.test(this.state.value)),
            onClick: function onClick(evt) {
              evt.preventDefault();
              evt.stopPropagation();
              _this2.props.onClick(_this2.state.value);
            }
          }),
          'Upload'
        )
      );
    }
  }]);
  return ButtonWithInput;
}(_react2.default.Component);

exports.default = ButtonWithInput;