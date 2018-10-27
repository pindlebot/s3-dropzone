"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var createClient = function createClient(_ref) {
  var region = _ref.region,
      identityPoolId = _ref.identityPoolId,
      bucketName = _ref.bucketName;
  _awsSdk.default.config.region = region;
  _awsSdk.default.config.credentials = new _awsSdk.default.CognitoIdentityCredentials({
    IdentityPoolId: identityPoolId
  });
  var s3 = new _awsSdk.default.S3();

  var remove = function remove(key) {
    var bucket = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : bucketName;
    return s3.deleteObject({
      Bucket: bucket,
      Key: key
    }).promise();
  };

  var presign = function presign(params) {
    return new Promise(function (resolve, reject) {
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
    return fetch(payload.url, (0, _objectSpread2.default)({
      method: 'POST',
      body: formData
    }, params));
  };

  var putObject = function putObject(params) {
    return s3.putObject((0, _objectSpread2.default)({
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
  return (
    /*#__PURE__*/
    function (_React$Component) {
      (0, _inherits2.default)(_class2, _React$Component);

      function _class2() {
        var _getPrototypeOf2;

        var _this;

        (0, _classCallCheck2.default)(this, _class2);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(_class2)).call.apply(_getPrototypeOf2, [this].concat(args)));
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
          client: undefined
        });
        return _this;
      }

      (0, _createClass2.default)(_class2, [{
        key: "render",
        value: function render() {
          return _react.default.createElement(Component, (0, _extends2.default)({}, this.props, {
            client: this.state.client
          }));
        }
      }], [{
        key: "getDerivedStateFromProps",
        value: function getDerivedStateFromProps(nextProps, prevState) {
          return prevState.client ? null : {
            client: createClient(nextProps)
          };
        }
      }]);
      return _class2;
    }(_react.default.Component)
  );
};

var _default = withAWS;
exports.default = _default;