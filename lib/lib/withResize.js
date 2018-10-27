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

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withResize = function withResize(Component) {
  return function (_React$Component) {
    (0, _inherits3.default)(_class2, _React$Component);

    function _class2() {
      var _ref;

      var _temp, _this, _ret;

      (0, _classCallCheck3.default)(this, _class2);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = _class2.__proto__ || (0, _getPrototypeOf2.default)(_class2)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = function () {
        setTimeout(function () {
          return window.addEventListener('click', _this.onWindowClick);
        });
        setTimeout(function () {
          return window.addEventListener('resize', (0, _lodash2.default)(_this.onWindowResize, 200));
        });
      }, _this.componentWillUnmount = function () {
        window.removeEventListener('click', _this.onWindowClick);
        window.removeEventListener('resize', _this.onWindowResize);
      }, _this.onWindowClick = function (evt) {
        _this.props.dispatch({
          type: 'SET_WINDOW_CLICK',
          payload: true
        });
      }, _this.onWindowResize = function (_ref2) {
        var srcElement = _ref2.srcElement;

        var width = srcElement.innerWidth;
        var height = srcElement.innerHeight;
        _this.props.dispatch({
          type: 'SET_DIMENSIONS',
          payload: { width: width, height: height }
        });
      }, _this.onDragEnter = function (evt) {
        _this.props.dispatch({
          type: 'SET_DRAG',
          payload: true
        });
      }, _this.onDragLeave = function (evt) {
        _this.props.dispatch({
          type: 'SET_DRAG',
          payload: false
        });
      }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(_class2, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(Component, (0, _extends3.default)({}, this.props, {
          onDragEnter: this.onDragEnter,
          onDragLeave: this.onDragLeave
        }));
      }
    }]);
    return _class2;
  }(_react2.default.Component);
};

exports.default = withResize;