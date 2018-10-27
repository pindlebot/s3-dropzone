'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _Thumbnail = require('../Thumbnail');

var _Thumbnail2 = _interopRequireDefault(_Thumbnail);

var _KeyboardArrowRight = require('../icons/KeyboardArrowRight');

var _KeyboardArrowRight2 = _interopRequireDefault(_KeyboardArrowRight);

var _KeyboardArrowLeft = require('../icons/KeyboardArrowLeft');

var _KeyboardArrowLeft2 = _interopRequireDefault(_KeyboardArrowLeft);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PrevButton = function PrevButton(props) {
  return props.modal === 'minimized' || props.view ? false : _react2.default.createElement(
    'button',
    {
      className: 'before',
      onClick: props.onClick,
      role: 'button',
      disabled: props.page <= 0
    },
    _react2.default.createElement(_KeyboardArrowLeft2.default, { classes: props.classes })
  );
};

var NextButton = function NextButton(props) {
  return props.modal === 'minimized' || props.view ? false : _react2.default.createElement(
    'button',
    {
      className: 'after',
      onClick: props.onClick,
      role: 'button',
      disabled: props.page * props.gridSize >= props.uploads.length
    },
    _react2.default.createElement(_KeyboardArrowRight2.default, { classes: props.classes })
  );
};

var Grid = function (_React$Component) {
  (0, _inherits3.default)(Grid, _React$Component);

  function Grid() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Grid);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Grid.__proto__ || (0, _getPrototypeOf2.default)(Grid)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      page: 0
    }, _this.onClickPrev = function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
      _this.setState(function (prevState) {
        return {
          page: prevState.page - 1
        };
      });
    }, _this.onClickNext = function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
      _this.setState(function (prevState) {
        return {
          page: prevState.page + 1
        };
      });
    }, _this.renderGridBody = function () {
      var page = _this.state.page;
      var _this$props = _this.props,
          view = _this$props.view,
          gridSize = _this$props.gridSize;

      var startIndex = page * gridSize;
      var uploads = view ? [view] : [].concat((0, _toConsumableArray3.default)(_this.props.uploads)).slice(startIndex, startIndex + gridSize);

      return uploads.map(function (upload, index) {
        return _react2.default.createElement(_Thumbnail2.default, (0, _extends3.default)({
          index: index * page,
          key: upload.id,
          page: page
        }, upload, _this.props));
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Grid, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          drag = _props.drag,
          view = _props.view,
          classes = _props.classes,
          modal = _props.modal,
          classNameProp = _props.className;

      console.log('grid', this.props);
      var page = this.state.page;

      var minimized = modal === 'minimized';
      var className = (0, _classnames2.default)('dz-modal-content', view ? 'full-width' : '');
      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(PrevButton, (0, _extends3.default)({}, this.props, {
          page: page,
          onClick: this.onClickPrev
        })),
        _react2.default.createElement(
          'div',
          {
            className: classes.grid,
            style: {
              opacity: drag ? 0.5 : 1.0
            },
            ref: function ref(_ref2) {
              _this2.grid = _ref2;
            }
          },
          !minimized && this.renderGridBody()
        ),
        _react2.default.createElement(NextButton, (0, _extends3.default)({}, this.props, {
          page: page,
          onClick: this.onClickNext
        }))
      );
    }
  }]);
  return Grid;
}(_react2.default.Component);

Grid.defaultProps = {
  uploads: [],
  view: undefined
};

exports.default = Grid;