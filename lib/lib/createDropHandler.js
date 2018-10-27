"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.createDropHandler = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var readAsDataURL = function readAsDataURL(key, file) {
  return new Promise(function (resolve, reject) {
    var reader = new window.FileReader();
    reader.addEventListener('load', function () {
      resolve({
        data: reader.result,
        key: key,
        id: key,
        loading: true
      });
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  });
};

var createPreviews = function createPreviews(files, _ref) {
  var uploads = _ref.uploads,
      mapFileToParams = _ref.mapFileToParams,
      dispatch = _ref.dispatch;
  var copy = (0, _toConsumableArray2.default)(uploads);

  var createPreview = function createPreview(file) {
    var params = mapFileToParams(file);
    var key = params.Fields.key;
    return readAsDataURL(key, file).then(function (result) {
      copy.unshift(result);
      return [file, params];
    });
  };

  return Promise.all(files.map(createPreview)).then(function (result) {
    dispatch({
      type: 'SET_UPLOADS',
      payload: copy
    });
    return result;
  });
};

var createDropHandler = function createDropHandler(_ref2) {
  var mapFileToParams = _ref2.mapFileToParams,
      uploads = _ref2.uploads,
      requestParams = _ref2.requestParams,
      dispatch = _ref2.dispatch,
      client = _ref2.client;
  return (
    /*#__PURE__*/
    function () {
      var _ref3 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(files) {
        var previews, errors, nextUploads, _previews$shift, _previews$shift2, file, params, key, payload, upload;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return createPreviews(files, {
                  uploads: uploads,
                  mapFileToParams: mapFileToParams,
                  dispatch: dispatch
                });

              case 2:
                previews = _context.sent;
                errors = [];
                nextUploads = [];

              case 5:
                if (!previews.length) {
                  _context.next = 32;
                  break;
                }

                _previews$shift = previews.shift(), _previews$shift2 = (0, _slicedToArray2.default)(_previews$shift, 2), file = _previews$shift2[0], params = _previews$shift2[1];
                key = params.Fields.key;
                payload = void 0;
                _context.prev = 9;
                _context.next = 12;
                return client.presign(params);

              case 12:
                payload = _context.sent;
                _context.next = 19;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](9);

                if (process.env.NODE_ENV !== 'production') {
                  console.error(_context.t0);
                }

                errors.push({
                  error: _context.t0,
                  key: key
                });

              case 19:
                _context.prev = 19;
                _context.next = 22;
                return client.post(file, payload, requestParams);

              case 22:
                upload = _context.sent;
                nextUploads.push((0, _objectSpread2.default)({}, upload, {
                  id: key,
                  key: key
                }));
                _context.next = 30;
                break;

              case 26:
                _context.prev = 26;
                _context.t1 = _context["catch"](19);

                if (process.env.NODE_ENV !== 'production') {
                  console.error(_context.t1);
                }

                errors.push({
                  error: _context.t1,
                  key: key
                });

              case 30:
                _context.next = 5;
                break;

              case 32:
                return _context.abrupt("return", {
                  uploads: nextUploads,
                  errors: errors
                });

              case 33:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[9, 15], [19, 26]]);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }()
  );
};

exports.createDropHandler = createDropHandler;
var _default = createDropHandler;
exports.default = _default;