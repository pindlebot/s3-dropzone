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

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _IconButton = require('./IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Delete = require('../icons/Delete');

var _Delete2 = _interopRequireDefault(_Delete);

var _Close = require('../icons/Close');

var _Close2 = _interopRequireDefault(_Close);

var _Add = require('../icons/Add');

var _Add2 = _interopRequireDefault(_Add);

var _SpinnerComponent = require('./SpinnerComponent');

var _SpinnerComponent2 = _interopRequireDefault(_SpinnerComponent);

var _Error = require('../icons/Error');

var _Error2 = _interopRequireDefault(_Error);

var _ZoomOutMap = require('../icons/ZoomOutMap');

var _ZoomOutMap2 = _interopRequireDefault(_ZoomOutMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DefaultToolbar(props) {
  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    _react2.default.createElement(
      'div',
      { className: 'dz-thumbnail-overlay-row' },
      _react2.default.createElement(
        _IconButton2.default,
        (0, _extends3.default)({}, props, {
          onClick: props.onClick,
          index: props.index,
          name: 'delete',
          src: props.src
        }),
        _react2.default.createElement(_Delete2.default, {
          classes: props.classes,
          fill: props.fill
        })
      ),
      !props.error && _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
          _IconButton2.default,
          (0, _extends3.default)({}, props, {
            onClick: props.onClick,
            index: props.index,
            src: props.src,
            name: 'view' }),
          _react2.default.createElement(_ZoomOutMap2.default, {
            classes: props.classes,
            fill: props.fill
          })
        ),
        _react2.default.createElement(
          _IconButton2.default,
          (0, _extends3.default)({}, props, {
            onClick: props.onClick,
            index: props.index,
            src: props.src,
            name: 'insert' }),
          _react2.default.createElement(_Add2.default, {
            classes: props.classes,
            fill: props.fill
          })
        )
      )
    )
  );
}

var ThumbnailOverlayWrapper = function ThumbnailOverlayWrapper(props) {
  return _react2.default.createElement(
    'div',
    {
      className: props.className,
      style: props.dimensions
    },
    props.children
  );
};

var ThumbnailOverlay = function (_React$Component) {
  (0, _inherits3.default)(ThumbnailOverlay, _React$Component);

  function ThumbnailOverlay() {
    (0, _classCallCheck3.default)(this, ThumbnailOverlay);
    return (0, _possibleConstructorReturn3.default)(this, (ThumbnailOverlay.__proto__ || (0, _getPrototypeOf2.default)(ThumbnailOverlay)).apply(this, arguments));
  }

  (0, _createClass3.default)(ThumbnailOverlay, [{
    key: 'renderOverlay',
    value: function renderOverlay() {
      var _props = this.props,
          classes = _props.classes,
          loading = _props.loading,
          error = _props.error,
          hover = _props.hover,
          view = _props.view;

      var isExpanded = !!view;
      if (isExpanded) {
        return hover ? _react2.default.createElement(
          _IconButton2.default,
          (0, _extends3.default)({}, this.props, {
            onClick: this.props.onClick,
            index: this.props.index,
            src: this.props.src,
            name: 'close' }),
          _react2.default.createElement(_Close2.default, { classes: classes })
        ) : false;
      } else if (hover) {
        return _react2.default.createElement(DefaultToolbar, (0, _extends3.default)({}, this.props, {
          onClick: this.props.onClick,
          src: this.props.src,
          index: this.props.index,
          fill: error ? '#fff' : '#fff'
        }));
      } else if (error) {
        return _react2.default.createElement(
          'div',
          { className: 'dz-thumbnail-overlay-column' },
          _react2.default.createElement(_Error2.default, {
            classes: classes,
            fill: '#e4567b'
          })
        );
      } else if (loading) {
        return _react2.default.createElement(
          'div',
          { className: 'dz-thumbnail-overlay-column' },
          _react2.default.createElement(_SpinnerComponent2.default, {
            theme: this.props.theme,
            show: this.props.loading
          })
        );
      } else {
        return false;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var dimensions = this.props.view ? { width: '100%', height: '100%' } : this.props.dimensions;
      return _react2.default.createElement(
        ThumbnailOverlayWrapper,
        (0, _extends3.default)({}, this.props, {
          dimensions: dimensions,
          className: this.props.classes.thumbnailOverlay
        }),
        this.renderOverlay()
      );
    }
  }]);
  return ThumbnailOverlay;
}(_react2.default.Component);

exports.default = ThumbnailOverlay;