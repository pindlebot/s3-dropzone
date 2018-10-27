"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _shallowEqual = _interopRequireDefault(require("fbjs/lib/shallowEqual"));

var merge = function merge(nextProps, prevState) {
  var props = (0, _objectSpread2.default)({}, prevState);
  return Object.keys(nextProps).filter(function (propKey) {
    return typeof nextProps[propKey] !== 'function';
  }).reduce(function (acc, propKey) {
    acc[propKey] = nextProps[propKey];
    return acc;
  }, props);
};

var withMergedProps = function withMergedProps(initialState) {
  return function (Component) {
    return (
      /*#__PURE__*/
      function (_React$Component) {
        (0, _inherits2.default)(_class2, _React$Component);

        function _class2() {
          var _getPrototypeOf2;

          var _this;

          (0, _classCallCheck2.default)(this, _class2);

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(_class2)).call.apply(_getPrototypeOf2, [this].concat(args)));
          (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", (0, _objectSpread2.default)({}, initialState));
          (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "dispatch", function (state) {
            _this.setState(state);
          });
          return _this;
        }

        (0, _createClass2.default)(_class2, [{
          key: "render",
          value: function render() {
            return _react.default.createElement(Component, (0, _extends2.default)({}, this.props, this.state, {
              dispatch: this.dispatch
            }));
          }
        }], [{
          key: "getDerivedStateFromProps",
          value: function getDerivedStateFromProps(nextProps, prevState) {
            var merged = merge(nextProps, prevState);
            return (0, _shallowEqual.default)(prevState, merged) ? null : merged;
          }
        }]);
        return _class2;
      }(_react.default.Component)
    );
  };
};

var _default = withMergedProps;
exports.default = _default;