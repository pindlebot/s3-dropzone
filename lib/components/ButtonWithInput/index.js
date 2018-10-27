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

var _url = _interopRequireDefault(require("../../lib/url"));

var Button = function Button(props) {
  return _react.default.createElement("button", {
    className: "dz-button",
    style: props.theme.button,
    onClick: props.onClick,
    disabled: props.disabled
  }, props.children);
};

var ButtonWithInput =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(ButtonWithInput, _React$Component);

  function ButtonWithInput() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ButtonWithInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ButtonWithInput)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      value: ''
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onChange", function (evt) {
      return _this.setState({
        value: evt.target.value
      });
    });
    return _this;
  }

  (0, _createClass2.default)(ButtonWithInput, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", {
        className: "dz-input-group"
      }, _react.default.createElement("input", {
        value: this.state.value,
        onChange: this.onChange,
        className: "dz-button-input"
      }), _react.default.createElement(Button, (0, _extends2.default)({}, this.props, {
        disabled: !(this.state.value && _url.default.test(this.state.value)),
        onClick: function onClick(evt) {
          evt.preventDefault();
          evt.stopPropagation();

          _this2.props.onClick(_this2.state.value);
        }
      }), "Upload"));
    }
  }]);
  return ButtonWithInput;
}(_react.default.Component);

var _default = ButtonWithInput;
exports.default = _default;