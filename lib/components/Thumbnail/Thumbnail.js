"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _react = _interopRequireDefault(require("react"));

var _ThumbnailOverlay = _interopRequireDefault(require("./ThumbnailOverlay"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactValidAttributes = require("react-valid-attributes");

function Image(props) {
  var className = (0, _classnames.default)([props.classes.image, props.className].concat((0, _toConsumableArray2.default)(props.classNames)));
  var elementProps = (0, _reactValidAttributes.pick)(props, 'img');
  return _react.default.createElement("img", (0, _extends2.default)({}, elementProps, {
    style: props.style,
    className: className,
    onLoad: props.onLoad,
    onError: props.onError,
    src: props.data || props.src,
    ref: props.refCallback
  }));
}

Image.defaultProps = {
  className: '',
  classNames: []
};

var Thumbnail =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Thumbnail, _React$Component);

  function Thumbnail() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Thumbnail);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Thumbnail)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      hover: false,
      loading: true,
      className: '',
      dimensions: {},
      aspectRatio: 1
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "preventBubbles", function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "updateStore", function (key, value) {
      var index = _this.props.index;
      var uploads = (0, _toConsumableArray2.default)(_this.props.uploads);
      uploads[index] = (0, _objectSpread3.default)({}, uploads[index], (0, _defineProperty2.default)({}, key, value));

      _this.props.dispatch({
        type: 'SET_UPLOADS',
        payload: uploads
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "refCallback", function (ref) {
      if (ref) {
        var _ref$getBoundingClien = ref.getBoundingClientRect(),
            width = _ref$getBoundingClien.width,
            height = _ref$getBoundingClien.height;

        _this.setState({
          dimensions: {
            width: width,
            height: height
          }
        });
      }
    });
    return _this;
  }

  (0, _createClass2.default)(Thumbnail, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          view = _this$props.view,
          classes = _this$props.classes,
          error = _this$props.error;
      var loading = this.state.loading;
      var className = (0, _classnames.default)(classes.thumbnail, error ? 'dz-thumbnail-error' : loading ? 'dz-thumbnail-loading' : undefined);
      return _react.default.createElement("figure", {
        style: this.props.theme.figure,
        onClick: this.preventBubbles,
        className: className,
        onMouseEnter: function onMouseEnter() {
          _this2.setState({
            hover: true
          });
        },
        onMouseLeave: function onMouseLeave() {
          _this2.setState({
            hover: false
          });
        }
      }, _react.default.createElement(Image, (0, _extends2.default)({
        onLoad: function onLoad(evt) {
          if (_this2.state.loading) {
            _this2.setState({
              loading: false
            });
          }
        },
        onError: function onError(evt) {
          _this2.updateStore('error', true);
        },
        refCallback: this.refCallback
      }, this.props)), _react.default.createElement(_ThumbnailOverlay.default, (0, _extends2.default)({
        error: error,
        loading: loading,
        hover: this.state.hover,
        dimensions: this.state.dimensions
      }, this.props)));
    }
  }]);
  return Thumbnail;
}(_react.default.Component);

Thumbnail.defaultProps = {
  img: {},
  loading: false
};
var _default = Thumbnail;
exports.default = _default;