"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _Thumbnail = _interopRequireDefault(require("../Thumbnail"));

var _KeyboardArrowRight = _interopRequireDefault(require("../icons/KeyboardArrowRight"));

var _KeyboardArrowLeft = _interopRequireDefault(require("../icons/KeyboardArrowLeft"));

var _classnames = _interopRequireDefault(require("classnames"));

var PrevButton = function PrevButton(props) {
  return props.modal === 'minimized' || props.view ? false : _react.default.createElement("button", {
    className: "before",
    onClick: props.onClick,
    role: "button",
    disabled: props.page <= 0
  }, _react.default.createElement(_KeyboardArrowLeft.default, {
    classes: props.classes
  }));
};

var NextButton = function NextButton(props) {
  return props.modal === 'minimized' || props.view ? false : _react.default.createElement("button", {
    className: "after",
    onClick: props.onClick,
    role: "button",
    disabled: props.page * props.gridSize >= props.uploads.length
  }, _react.default.createElement(_KeyboardArrowRight.default, {
    classes: props.classes
  }));
};

var Grid =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Grid, _React$Component);

  function Grid() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Grid);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Grid)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      page: 0
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onClickPrev", function (evt) {
      evt.preventDefault();
      evt.stopPropagation();

      _this.setState(function (prevState) {
        return {
          page: prevState.page - 1
        };
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onClickNext", function (evt) {
      evt.preventDefault();
      evt.stopPropagation();

      _this.setState(function (prevState) {
        return {
          page: prevState.page + 1
        };
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "renderGridBody", function () {
      var page = _this.state.page;
      var _this$props = _this.props,
          view = _this$props.view,
          gridSize = _this$props.gridSize;
      var startIndex = page * gridSize;
      var uploads = view ? [view] : (0, _toConsumableArray2.default)(_this.props.uploads).slice(startIndex, startIndex + gridSize);
      return uploads.map(function (upload, index) {
        return _react.default.createElement(_Thumbnail.default, (0, _extends2.default)({
          index: index * page,
          key: upload.id,
          page: page
        }, upload, _this.props));
      });
    });
    return _this;
  }

  (0, _createClass2.default)(Grid, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          drag = _this$props2.drag,
          view = _this$props2.view,
          classes = _this$props2.classes,
          modal = _this$props2.modal,
          classNameProp = _this$props2.className;
      console.log('grid', this.props);
      var page = this.state.page;
      var minimized = modal === 'minimized';
      var className = (0, _classnames.default)('dz-modal-content', view ? 'full-width' : '');
      return _react.default.createElement("div", {
        className: className
      }, _react.default.createElement(PrevButton, (0, _extends2.default)({}, this.props, {
        page: page,
        onClick: this.onClickPrev
      })), _react.default.createElement("div", {
        className: classes.grid,
        style: {
          opacity: drag ? 0.5 : 1.0
        },
        ref: function ref(_ref) {
          _this2.grid = _ref;
        }
      }, !minimized && this.renderGridBody()), _react.default.createElement(NextButton, (0, _extends2.default)({}, this.props, {
        page: page,
        onClick: this.onClickNext
      })));
    }
  }]);
  return Grid;
}(_react.default.Component);

Grid.defaultProps = {
  uploads: [],
  view: undefined
};
var _default = Grid;
exports.default = _default;