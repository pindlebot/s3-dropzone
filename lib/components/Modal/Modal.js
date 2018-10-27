"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ModalFooter = exports.ModalHeader = void 0;

var _react = _interopRequireDefault(require("react"));

var _WindowIcons = require("../WindowIcons");

var _ButtonWithInput = _interopRequireDefault(require("../ButtonWithInput"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var ModalHeader = function ModalHeader(props) {
  return _react.default.createElement("div", {
    className: "dz-modal-header"
  }, _react.default.createElement("div", {
    className: "dz-modal-header-inner",
    style: {}
  }, _react.default.createElement("button", {
    className: "dz-oval",
    onClick: function onClick(evt) {
      evt.stopPropagation();
      props.dispatch({
        type: 'SET_VISIBLE',
        payload: false
      });
      props.onClose(evt);
    }
  }, _react.default.createElement(_WindowIcons.CloseIcon, null)), _react.default.createElement("button", {
    className: "dz-oval",
    onClick: function onClick(evt) {
      evt.stopPropagation();
      props.setModalState('minimized');
    }
  }, _react.default.createElement(_WindowIcons.MinimizeIcon, null)), _react.default.createElement("button", {
    className: "dz-oval",
    onClick: function onClick(evt) {
      evt.stopPropagation();
      props.setModalState('maximized');
    }
  }, _react.default.createElement(_WindowIcons.MaximizeIcon, null))));
};

exports.ModalHeader = ModalHeader;

var ModalFooter = function ModalFooter(props) {
  return props.modal === 'minimized' || props.view ? false : _react.default.createElement("div", {
    onClick: function onClick(evt) {
      evt.preventDefault();
      evt.stopPropagation();
    },
    className: props.classes.modalFooter
  }, _react.default.createElement(_ButtonWithInput.default, props));
};

exports.ModalFooter = ModalFooter;

var createStyles = function createStyles(props) {
  return {
    width: props.modal === 'maximized' ? '100%' : "".concat(window.innerHeight / window.innerWidth * 90, "vw"),
    height: props.modal === 'maximized' ? '100%' : '70vh',
    backgroundColor: props.modal === 'minimized' ? 'transparent' : '#F4F9FD',
    boxShadow: props.modal === 'minimized' ? 'none' : '0px 1px 2px 0px rgba(0, 0, 0, 0.14)'
  };
};

var Modal = function Modal(props) {
  return _react.default.createElement("div", {
    className: props.classes.modalWrapper
  }, _react.default.createElement("div", {
    className: props.classes.modalOverlay
  }), _react.default.createElement("div", {
    className: props.classes.modal,
    style: createStyles(props)
  }, props.children));
};

Modal.propTypes = {
  classes: _propTypes.default.object,
  modal: _propTypes.default.string
};
ModalHeader.propTypes = {
  setModalState: _propTypes.default.func,
  dispatch: _propTypes.default.func,
  onClose: _propTypes.default.func
};
ModalFooter.propTypes = {
  modal: _propTypes.default.string,
  view: _propTypes.default.object,
  classes: _propTypes.default.object
};
var _default = Modal;
exports.default = _default;