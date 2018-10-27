"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaximizeIcon = exports.MinimizeIcon = exports.CloseIcon = void 0;

var _react = _interopRequireDefault(require("react"));

var _SvgIcon = _interopRequireDefault(require("../SvgIcon"));

var CloseIcon = function CloseIcon(props) {
  return _react.default.createElement(_SvgIcon.default, props, _react.default.createElement("g", {
    id: "Page-1",
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    fillRule: "evenodd"
  }, _react.default.createElement("g", {
    id: "red",
    transform: "translate(-20.000000, -19.000000)",
    fill: "#4D0000"
  }, _react.default.createElement("g", {
    id: "red-set",
    transform: "translate(14.000000, 18.000000)"
  }, _react.default.createElement("rect", {
    id: "Rectangle",
    transform: "translate(35.000000, 30.454545) rotate(45.000000) translate(-35.000000, -30.454545) ",
    x: "-1.36363636",
    y: "25.9090909",
    width: "72.7272727",
    height: "9.09090909"
  }), _react.default.createElement("rect", {
    id: "Rectangle",
    transform: "translate(35.000000, 30.454545) scale(1, -1) rotate(45.000000) translate(-35.000000, -30.454545) ",
    x: "-1.36363636",
    y: "25.9090909",
    width: "72.7272727",
    height: "9.09090909"
  })))));
};

exports.CloseIcon = CloseIcon;
CloseIcon.defaultProps = {
  viewBox: '0 0 58 59',
  classes: {
    svgIcon: ''
  }
};

var MinimizeIcon = function MinimizeIcon(props) {
  return _react.default.createElement(_SvgIcon.default, props, _react.default.createElement("g", {
    id: "Page-1",
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    fillRule: "evenodd"
  }, _react.default.createElement("g", {
    id: "yellow",
    transform: "translate(-14.000000, -46.000000)",
    fill: "#995700"
  }, _react.default.createElement("g", {
    id: "yellow-set",
    transform: "translate(14.000000, 46.000000)"
  }, _react.default.createElement("rect", {
    id: "Rectangle",
    x: "0",
    y: "0",
    width: "72.7272727",
    height: "9.09090909"
  })))));
};

exports.MinimizeIcon = MinimizeIcon;
MinimizeIcon.defaultProps = {
  viewBox: '0 0 73 10',
  classes: {
    svgIcon: ''
  }
};

var MaximizeIcon = function MaximizeIcon(props) {
  return _react.default.createElement(_SvgIcon.default, props, _react.default.createElement("g", {
    id: "Page-1",
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    fillRule: "evenodd"
  }, _react.default.createElement("g", {
    id: "green",
    transform: "translate(-24.000000, -24.000000)",
    fill: "#006500"
  }, _react.default.createElement("g", {
    id: "green-set",
    transform: "translate(24.000000, 24.000000)"
  }, _react.default.createElement("path", {
    d: "M51.7564103,1.00779537 L51.8411287,42.5897436 L10.174462,0.923076923 L51.7564103,1.00779537 Z M1.00779537,51.7564103 L0.923076923,10.174462 L42.5897436,51.8411287 L1.00779537,51.7564103 Z",
    id: "Combined-Shape"
  })))));
};

exports.MaximizeIcon = MaximizeIcon;
MaximizeIcon.defaultProps = {
  viewBox: '0 0 52 52',
  classes: {
    svgIcon: ''
  }
};