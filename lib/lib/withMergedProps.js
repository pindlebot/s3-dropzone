'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _shallowEqual = require('fbjs/lib/shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var merge = function merge(nextProps, prevState) {
  var props = (0, _extends3.default)({}, prevState);
  return (0, _keys2.default)(nextProps).filter(function (propKey) {
    return typeof nextProps[propKey] !== 'function';
  }).reduce(function (acc, propKey) {
    acc[propKey] = nextProps[propKey];
    return acc;
  }, props);
};

var withMergedProps = function withMergedProps(initialState) {
  return function (Component) {
    return function (_React$Component) {
      (0, _inherits3.default)(_class2, _React$Component);

      function _class2() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, _class2);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = _class2.__proto__ || (0, _getPrototypeOf2.default)(_class2)).call.apply(_ref, [this].concat(args))), _this), _this.state = (0, _extends3.default)({}, initialState), _this.dispatch = function (state) {
          _this.setState(state);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
      }

      (0, _createClass3.default)(_class2, [{
        key: 'render',
        value: function render() {
          return _react2.default.createElement(Component, (0, _extends3.default)({}, this.props, this.state, { dispatch: this.dispatch }));
        }
      }], [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(nextProps, prevState) {
          var merged = merge(nextProps, prevState);
          return (0, _shallowEqual2.default)(prevState, merged) ? null : merged;
        }
      }]);
      return _class2;
    }(_react2.default.Component);
  };
};

exports.default = withMergedProps;