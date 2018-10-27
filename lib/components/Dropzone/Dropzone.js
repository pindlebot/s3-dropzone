"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _fileType = _interopRequireDefault(require("file-type"));

var _BaseDropzone = _interopRequireDefault(require("../BaseDropzone"));

var _Grid = _interopRequireDefault(require("../Grid/Grid"));

var theme = _interopRequireWildcard(require("../../lib/theme"));

var _Modal = _interopRequireWildcard(require("../Modal/Modal"));

var _createDropHandler = require("../../lib/createDropHandler");

var _withResize = _interopRequireDefault(require("../../lib/withResize"));

var _withAWS = _interopRequireDefault(require("../../lib/withAWS"));

var _reactRedux = require("react-redux");

var _redux = require("../../lib/redux");

var _redux2 = require("redux");

var S3Dropzone =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(S3Dropzone, _React$Component);

  function S3Dropzone() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, S3Dropzone);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(S3Dropzone)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {});
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onClick",
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(evt, type, key) {
        var upload, uploads;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log({
                  type: type,
                  key: key
                });
                upload = _this.props.redux.uploads.find(function (_ref2) {
                  var src = _ref2.src;
                  return src === key;
                });
                evt.preventDefault();

                if (type === 'delete') {
                  if (!upload.error) {
                    _this.props.client.remove(upload.id || upload.key);
                  }

                  uploads = (0, _toConsumableArray2.default)(_this.props.redux.uploads).filter(function (_ref3) {
                    var src = _ref3.src;
                    return src !== key;
                  });

                  _this.props.dispatch({
                    type: 'SET_UPLOADS',
                    payload: uploads
                  });
                } else if (type === 'view') {
                  _this.props.dispatch({
                    type: 'SET_VIEW',
                    payload: upload
                  });
                } else if (type === 'close') {
                  _this.props.dispatch({
                    type: 'SET_VIEW',
                    payload: undefined
                  });
                }

                _this.props.handleClick(evt, type, upload);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "renderGrid", function () {
      return _react.default.createElement(_Grid.default, (0, _extends2.default)({}, _this.props, {
        onClick: _this.onClick,
        uploads: _this.props.redux.uploads,
        view: _this.props.redux.view,
        modal: _this.props.redux.modal,
        gridSize: _this.props.redux.gridSize
      }));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "setModalState", function (state) {
      var modal = _this.props.redux.modal;

      _this.props.dispatch({
        type: 'SET_MODAL',
        payload: modal === state ? undefined : state
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleSubmit",
    /*#__PURE__*/
    function () {
      var _ref4 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(value) {
        var _value$match, _value$match2, _, key, buff, type, file;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _value$match = value.match(/.*\/([^?]+)/), _value$match2 = (0, _slicedToArray2.default)(_value$match, 2), _ = _value$match2[0], key = _value$match2[1];
                key = decodeURIComponent(key).replace(/(\.(?=[^.]*\.))|[\\^`><{}[\]#%"'+~\s|]/g, '');
                _context2.next = 4;
                return fetch(value).then(function (resp) {
                  return resp.arrayBuffer();
                });

              case 4:
                buff = _context2.sent;
                type = (0, _fileType.default)(buff);
                file = new File([buff], key, {
                  type: type
                });

                _this.onDrop([file]);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function (_x4) {
        return _ref4.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onDrop",
    /*#__PURE__*/
    function () {
      var _ref5 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(files) {
        var handleDrop, _ref6, uploads, errors;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this.props.onDragLeave();

                handleDrop = (0, _createDropHandler.createDropHandler)(_this.props);
                _context3.next = 4;
                return handleDrop(files);

              case 4:
                _ref6 = _context3.sent;
                uploads = _ref6.uploads;
                errors = _ref6.errors;

                _this.props.done(errors, uploads);

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function (_x5) {
        return _ref5.apply(this, arguments);
      };
    }());
    return _this;
  }

  (0, _createClass2.default)(S3Dropzone, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.uploads) {
        this.props.dispatch({
          type: 'SET_UPLOADS',
          payload: this.props.uploads
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          classes = _this$props.classes,
          uploads = _this$props.uploads,
          rest = (0, _objectWithoutProperties2.default)(_this$props, ["theme", "classes", "uploads"]);
      console.log(this.props);
      var visible = this.props.visible || this.props.redux.visible;
      if (!visible) return false;
      return _react.default.createElement(_Modal.default, (0, _extends2.default)({}, this.props, {
        modal: this.props.redux.modal,
        view: this.props.redux.view,
        dispatch: this.props.dispatch
      }), _react.default.createElement(_BaseDropzone.default, {
        onDragEnter: this.props.onDragEnter,
        onDragLeave: this.props.onDragLeave,
        onDrop: this.onDrop,
        className: this.props.redux.drag ? 'drag' : undefined,
        draggable: "true",
        theme: theme,
        classes: classes,
        dispatch: this.props.dispatch
      }, _react.default.createElement(_Modal.ModalHeader, (0, _extends2.default)({
        setModalState: this.setModalState,
        iconStyles: this.state.iconStyles,
        dispatch: this.props.dispatch
      }, this.props)), this.renderGrid(), _react.default.createElement(_Modal.ModalFooter, (0, _extends2.default)({
        modal: this.props.redux.modal,
        view: this.props.redux.view,
        onClick: this.handleSubmit
      }, this.props))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      // const gridSize = nextProps.redux.dimensions.width >= 568 ? 6 : 1
      // const modal = gridSize > 1 ? undefined : 'maximized'
      var view = nextProps.redux.windowClick && prevState.view ? undefined : prevState.view;
      return {
        view: view
      };
    }
  }]);
  return S3Dropzone;
}(_react.default.Component);

(0, _defineProperty2.default)(S3Dropzone, "defaultProps", {
  done: function done() {},
  onDrop: function onDrop() {},
  theme: theme.keys,
  classes: theme.classes,
  handleClick: function handleClick() {},
  onClose: function onClose() {},
  mapFileToParams: function mapFileToParams(file) {
    return {
      Fields: {
        key: "".concat(Math.round(Date.now() / 1000), "-").concat(file.name),
        'Content-Type': file.type
      }
    };
  },
  region: 'us-east-1',
  requestParams: {}
});

var _default = (0, _redux2.compose)(function (Component) {
  return function (props) {
    return _react.default.createElement(_reactRedux.Provider, {
      store: _redux.store
    }, _react.default.createElement(Component, props));
  };
}, (0, _reactRedux.connect)(function (state) {
  return state;
}, function (dispatch) {
  return {
    dispatch: dispatch
  };
}), _withAWS.default, _withResize.default)(S3Dropzone);

exports.default = _default;