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

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var withResize = function withResize(Component) {
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
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "componentDidMount", function () {
          setTimeout(function () {
            return window.addEventListener('click', _this.onWindowClick);
          });
          setTimeout(function () {
            return window.addEventListener('resize', (0, _lodash.default)(_this.onWindowResize, 200));
          });
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "componentWillUnmount", function () {
          window.removeEventListener('click', _this.onWindowClick);
          window.removeEventListener('resize', _this.onWindowResize);
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onWindowClick", function (evt) {
          _this.props.dispatch({
            type: 'SET_WINDOW_CLICK',
            payload: true
          });
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onWindowResize", function (_ref) {
          var srcElement = _ref.srcElement;
          var width = srcElement.innerWidth;
          var height = srcElement.innerHeight;

          _this.props.dispatch({
            type: 'SET_DIMENSIONS',
            payload: {
              width: width,
              height: height
            }
          });
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onDragEnter", function (evt) {
          _this.props.dispatch({
            type: 'SET_DRAG',
            payload: true
          });
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onDragLeave", function (evt) {
          _this.props.dispatch({
            type: 'SET_DRAG',
            payload: false
          });
        });
        return _this;
      }

      (0, _createClass2.default)(_class2, [{
        key: "render",
        value: function render() {
          return _react.default.createElement(Component, (0, _extends2.default)({}, this.props, {
            onDragEnter: this.onDragEnter,
            onDragLeave: this.onDragLeave
          }));
        }
      }]);
      return _class2;
    }(_react.default.Component)
  );
};

var _default = withResize;
exports.default = _default;