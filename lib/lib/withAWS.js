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

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createClient = function createClient(_ref) {
  var region = _ref.region,
      identityPoolId = _ref.identityPoolId,
      bucketName = _ref.bucketName;

  _awsSdk2.default.config.region = region;
  _awsSdk2.default.config.credentials = new _awsSdk2.default.CognitoIdentityCredentials({
    IdentityPoolId: identityPoolId
  });
  var s3 = new _awsSdk2.default.S3();

  var remove = function remove(key) {
    var bucket = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : bucketName;
    return s3.deleteObject({
      Bucket: bucket,
      Key: key
    }).promise();
  };

  var presign = function presign(params) {
    return new _promise2.default(function (resolve, reject) {
      if (!params.Bucket) {
        params.Bucket = bucketName;
      }
      s3.createPresignedPost(params, function (err, data) {
        if (err) reject(err);
        resolve(data);
      });
    });
  };

  var post = function post(file, payload) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var formData = new window.FormData();
    for (var field in payload.fields) {
      formData.append(field, payload.fields[field]);
    }
    formData.append('file', file);
    return fetch(payload.url, (0, _extends3.default)({
      method: 'POST',
      body: formData
    }, params));
  };

  var putObject = function putObject(params) {
    return s3.putObject((0, _extends3.default)({
      Bucket: bucketName
    }, params)).promise();
  };

  return {
    remove: remove,
    presign: presign,
    post: post,
    putObject: putObject
  };
};

var withAWS = function withAWS(Component) {
  return function (_React$Component) {
    (0, _inherits3.default)(_class2, _React$Component);

    function _class2() {
      var _ref2;

      var _temp, _this, _ret;

      (0, _classCallCheck3.default)(this, _class2);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = _class2.__proto__ || (0, _getPrototypeOf2.default)(_class2)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
        client: undefined
      }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(_class2, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(Component, (0, _extends3.default)({}, this.props, { client: this.state.client }));
      }
    }], [{
      key: 'getDerivedStateFromProps',
      value: function getDerivedStateFromProps(nextProps, prevState) {
        return prevState.client ? null : { client: createClient(nextProps) };
      }
    }]);
    return _class2;
  }(_react2.default.Component);
};

exports.default = withAWS;