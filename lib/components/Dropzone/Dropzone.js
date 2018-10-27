'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _fileType = require('file-type');

var _fileType2 = _interopRequireDefault(_fileType);

var _BaseDropzone = require('../BaseDropzone');

var _BaseDropzone2 = _interopRequireDefault(_BaseDropzone);

var _Grid = require('../Grid/Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _theme = require('../../lib/theme');

var theme = _interopRequireWildcard(_theme);

var _Modal = require('../Modal/Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _createDropHandler = require('../../lib/createDropHandler');

var _withResize = require('../../lib/withResize');

var _withResize2 = _interopRequireDefault(_withResize);

var _withAWS = require('../../lib/withAWS');

var _withAWS2 = _interopRequireDefault(_withAWS);

var _reactRedux = require('react-redux');

var _redux = require('../../lib/redux');

var _redux2 = require('redux');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S3Dropzone = function (_React$Component) {
  (0, _inherits3.default)(S3Dropzone, _React$Component);

  function S3Dropzone() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, S3Dropzone);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = S3Dropzone.__proto__ || (0, _getPrototypeOf2.default)(S3Dropzone)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.onClick = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(evt, type, key) {
        var upload, uploads;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log({ type: type, key: key });
                upload = _this.props.redux.uploads.find(function (_ref3) {
                  var src = _ref3.src;
                  return src === key;
                });

                evt.preventDefault();
                if (type === 'delete') {
                  if (!upload.error) {
                    _this.props.client.remove(upload.id || upload.key);
                  }
                  uploads = [].concat((0, _toConsumableArray3.default)(_this.props.redux.uploads)).filter(function (_ref4) {
                    var src = _ref4.src;
                    return src !== key;
                  });

                  _this.props.dispatch({ type: 'SET_UPLOADS', payload: uploads });
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
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }(), _this.renderGrid = function () {
      return _react2.default.createElement(_Grid2.default, (0, _extends3.default)({}, _this.props, {
        onClick: _this.onClick,
        uploads: _this.props.redux.uploads,
        view: _this.props.redux.view,
        modal: _this.props.redux.modal,
        gridSize: _this.props.redux.gridSize
      }));
    }, _this.setModalState = function (state) {
      var modal = _this.props.redux.modal;

      _this.props.dispatch({
        type: 'SET_MODAL',
        payload: modal === state ? undefined : state
      });
    }, _this.handleSubmit = function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(value) {
        var _value$match, _value$match2, _, key, buff, type, file;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _value$match = value.match(/.*\/([^?]+)/), _value$match2 = (0, _slicedToArray3.default)(_value$match, 2), _ = _value$match2[0], key = _value$match2[1];

                key = decodeURIComponent(key).replace(/(\.(?=[^.]*\.))|[\\^`><{}[\]#%"'+~\s|]/g, '');
                _context2.next = 4;
                return fetch(value).then(function (resp) {
                  return resp.arrayBuffer();
                });

              case 4:
                buff = _context2.sent;
                type = (0, _fileType2.default)(buff);
                file = new File([buff], key, { type: type });

                _this.onDrop([file]);

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }));

      return function (_x4) {
        return _ref5.apply(this, arguments);
      };
    }(), _this.onDrop = function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(files) {
        var handleDrop, _ref7, uploads, errors;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this.props.onDragLeave();
                handleDrop = (0, _createDropHandler.createDropHandler)(_this.props);
                _context3.next = 4;
                return handleDrop(files);

              case 4:
                _ref7 = _context3.sent;
                uploads = _ref7.uploads;
                errors = _ref7.errors;

                _this.props.done(errors, uploads);

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }));

      return function (_x5) {
        return _ref6.apply(this, arguments);
      };
    }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(S3Dropzone, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.uploads) {
        this.props.dispatch({
          type: 'SET_UPLOADS',
          payload: this.props.uploads
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          theme = _props.theme,
          classes = _props.classes,
          uploads = _props.uploads,
          rest = (0, _objectWithoutProperties3.default)(_props, ['theme', 'classes', 'uploads']);

      console.log(this.props);
      var visible = this.props.visible || this.props.redux.visible;
      if (!visible) return false;
      return _react2.default.createElement(
        _Modal2.default,
        (0, _extends3.default)({}, this.props, {
          modal: this.props.redux.modal,
          view: this.props.redux.view,
          dispatch: this.props.dispatch
        }),
        _react2.default.createElement(
          _BaseDropzone2.default,
          {
            onDragEnter: this.props.onDragEnter,
            onDragLeave: this.props.onDragLeave,
            onDrop: this.onDrop,
            className: this.props.redux.drag ? 'drag' : undefined,
            draggable: 'true',
            theme: theme,
            classes: classes,
            dispatch: this.props.dispatch
          },
          _react2.default.createElement(_Modal.ModalHeader, (0, _extends3.default)({
            setModalState: this.setModalState,
            iconStyles: this.state.iconStyles,
            dispatch: this.props.dispatch
          }, this.props)),
          this.renderGrid(),
          _react2.default.createElement(_Modal.ModalFooter, (0, _extends3.default)({
            modal: this.props.redux.modal,
            view: this.props.redux.view,
            onClick: this.handleSubmit
          }, this.props))
        )
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      // const gridSize = nextProps.redux.dimensions.width >= 568 ? 6 : 1
      // const modal = gridSize > 1 ? undefined : 'maximized'
      var view = nextProps.redux.windowClick && prevState.view ? undefined : prevState.view;

      return { view: view };
    }
  }]);
  return S3Dropzone;
}(_react2.default.Component);

S3Dropzone.defaultProps = {
  done: function done() {},
  onDrop: function onDrop() {},
  theme: theme.keys,
  classes: theme.classes,
  handleClick: function handleClick() {},
  onClose: function onClose() {},
  mapFileToParams: function mapFileToParams(file) {
    return {
      Fields: {
        key: Math.round(Date.now() / 1000) + '-' + file.name,
        'Content-Type': file.type
      }
    };
  },
  region: 'us-east-1',
  requestParams: {}
};
exports.default = (0, _redux2.compose)(function (Component) {
  return function (props) {
    return _react2.default.createElement(
      _reactRedux.Provider,
      { store: _redux.store },
      _react2.default.createElement(Component, props)
    );
  };
}, (0, _reactRedux.connect)(function (state) {
  return state;
}, function (dispatch) {
  return { dispatch: dispatch };
}), _withAWS2.default, _withResize2.default)(S3Dropzone);