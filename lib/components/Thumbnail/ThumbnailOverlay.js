"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _IconButton = _interopRequireDefault(require("./IconButton"));

var _Delete = _interopRequireDefault(require("../icons/Delete"));

var _Close = _interopRequireDefault(require("../icons/Close"));

var _Add = _interopRequireDefault(require("../icons/Add"));

var _SpinnerComponent = _interopRequireDefault(require("./SpinnerComponent"));

var _Error = _interopRequireDefault(require("../icons/Error"));

var _ZoomOutMap = _interopRequireDefault(require("../icons/ZoomOutMap"));

function DefaultToolbar(props) {
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
    className: "dz-thumbnail-overlay-row"
  }, _react.default.createElement(_IconButton.default, (0, _extends2.default)({}, props, {
    onClick: props.onClick,
    index: props.index,
    name: "delete",
    src: props.src
  }), _react.default.createElement(_Delete.default, {
    classes: props.classes,
    fill: props.fill
  })), !props.error && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_IconButton.default, (0, _extends2.default)({}, props, {
    onClick: props.onClick,
    index: props.index,
    src: props.src,
    name: "view"
  }), _react.default.createElement(_ZoomOutMap.default, {
    classes: props.classes,
    fill: props.fill
  })), _react.default.createElement(_IconButton.default, (0, _extends2.default)({}, props, {
    onClick: props.onClick,
    index: props.index,
    src: props.src,
    name: "insert"
  }), _react.default.createElement(_Add.default, {
    classes: props.classes,
    fill: props.fill
  })))));
}

var ThumbnailOverlayWrapper = function ThumbnailOverlayWrapper(props) {
  return _react.default.createElement("div", {
    className: props.className,
    style: props.dimensions
  }, props.children);
};

var ThumbnailOverlay =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(ThumbnailOverlay, _React$Component);

  function ThumbnailOverlay() {
    (0, _classCallCheck2.default)(this, ThumbnailOverlay);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ThumbnailOverlay).apply(this, arguments));
  }

  (0, _createClass2.default)(ThumbnailOverlay, [{
    key: "renderOverlay",
    value: function renderOverlay() {
      var _this$props = this.props,
          classes = _this$props.classes,
          loading = _this$props.loading,
          error = _this$props.error,
          hover = _this$props.hover,
          view = _this$props.view;
      var isExpanded = !!view;

      if (isExpanded) {
        return hover ? _react.default.createElement(_IconButton.default, (0, _extends2.default)({}, this.props, {
          onClick: this.props.onClick,
          index: this.props.index,
          src: this.props.src,
          name: "close"
        }), _react.default.createElement(_Close.default, {
          classes: classes
        })) : false;
      } else if (hover) {
        return _react.default.createElement(DefaultToolbar, (0, _extends2.default)({}, this.props, {
          onClick: this.props.onClick,
          src: this.props.src,
          index: this.props.index,
          fill: error ? '#fff' : '#fff'
        }));
      } else if (error) {
        return _react.default.createElement("div", {
          className: "dz-thumbnail-overlay-column"
        }, _react.default.createElement(_Error.default, {
          classes: classes,
          fill: '#e4567b'
        }));
      } else if (loading) {
        return _react.default.createElement("div", {
          className: "dz-thumbnail-overlay-column"
        }, _react.default.createElement(_SpinnerComponent.default, {
          theme: this.props.theme,
          show: this.props.loading
        }));
      } else {
        return false;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var dimensions = this.props.view ? {
        width: '100%',
        height: '100%'
      } : this.props.dimensions;
      return _react.default.createElement(ThumbnailOverlayWrapper, (0, _extends2.default)({}, this.props, {
        dimensions: dimensions,
        className: this.props.classes.thumbnailOverlay
      }), this.renderOverlay());
    }
  }]);
  return ThumbnailOverlay;
}(_react.default.Component);

exports.default = ThumbnailOverlay;