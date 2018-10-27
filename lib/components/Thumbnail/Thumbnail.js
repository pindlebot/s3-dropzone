'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ThumbnailOverlay = require('./ThumbnailOverlay');

var _ThumbnailOverlay2 = _interopRequireDefault(_ThumbnailOverlay);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactValidAttributes = require('react-valid-attributes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Image(props) {
  var className = (0, _classnames2.default)([props.classes.image, props.className].concat((0, _toConsumableArray3.default)(props.classNames)));
  var elementProps = (0, _reactValidAttributes.pick)(props, 'img');
  return _react2.default.createElement('img', (0, _extends4.default)({}, elementProps, {
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

var Thumbnail = function (_React$Component) {
  (0, _inherits3.default)(Thumbnail, _React$Component);

  function Thumbnail() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Thumbnail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Thumbnail.__proto__ || (0, _getPrototypeOf2.default)(Thumbnail)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      hover: false,
      loading: true,
      className: '',
      dimensions: {},
      aspectRatio: 1
    }, _this.preventBubbles = function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }, _this.updateStore = function (key, value) {
      var index = _this.props.index;

      var uploads = [].concat((0, _toConsumableArray3.default)(_this.props.uploads));
      uploads[index] = (0, _extends4.default)({}, uploads[index], (0, _defineProperty3.default)({}, key, value));
      _this.props.dispatch({
        type: 'SET_UPLOADS',
        payload: uploads
      });
    }, _this.refCallback = function (ref) {
      if (ref) {
        var _ref$getBoundingClien = ref.getBoundingClientRect(),
            width = _ref$getBoundingClien.width,
            height = _ref$getBoundingClien.height;

        _this.setState({ dimensions: { width: width, height: height } });
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Thumbnail, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          view = _props.view,
          classes = _props.classes,
          error = _props.error;

      var loading = this.state.loading;
      var className = (0, _classnames2.default)(classes.thumbnail, error ? 'dz-thumbnail-error' : loading ? 'dz-thumbnail-loading' : undefined);
      return _react2.default.createElement(
        'figure',
        {
          style: this.props.theme.figure,
          onClick: this.preventBubbles,
          className: className,
          onMouseEnter: function onMouseEnter() {
            _this2.setState({ hover: true });
          },
          onMouseLeave: function onMouseLeave() {
            _this2.setState({ hover: false });
          }
        },
        _react2.default.createElement(Image, (0, _extends4.default)({
          onLoad: function onLoad(evt) {
            if (_this2.state.loading) {
              _this2.setState({ loading: false });
            }
          },
          onError: function onError(evt) {
            _this2.updateStore('error', true);
          },
          refCallback: this.refCallback
        }, this.props)),
        _react2.default.createElement(_ThumbnailOverlay2.default, (0, _extends4.default)({
          error: error,
          loading: loading,
          hover: this.state.hover,
          dimensions: this.state.dimensions
        }, this.props))
      );
    }
  }]);
  return Thumbnail;
}(_react2.default.Component);

Thumbnail.defaultProps = {
  img: {},
  loading: false
};

exports.default = Thumbnail;