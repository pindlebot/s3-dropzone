'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalFooter = exports.ModalHeader = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _WindowIcons = require('../WindowIcons');

var _ButtonWithInput = require('../ButtonWithInput');

var _ButtonWithInput2 = _interopRequireDefault(_ButtonWithInput);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModalHeader = exports.ModalHeader = function ModalHeader(props) {
  return _react2.default.createElement(
    'div',
    { className: 'dz-modal-header' },
    _react2.default.createElement(
      'div',
      { className: 'dz-modal-header-inner', style: {} },
      _react2.default.createElement(
        'button',
        {
          className: 'dz-oval',
          onClick: function onClick(evt) {
            evt.stopPropagation();
            props.dispatch({ type: 'SET_VISIBLE', payload: false });
            props.onClose(evt);
          }
        },
        _react2.default.createElement(_WindowIcons.CloseIcon, null)
      ),
      _react2.default.createElement(
        'button',
        {
          className: 'dz-oval',
          onClick: function onClick(evt) {
            evt.stopPropagation();
            props.setModalState('minimized');
          }
        },
        _react2.default.createElement(_WindowIcons.MinimizeIcon, null)
      ),
      _react2.default.createElement(
        'button',
        {
          className: 'dz-oval',
          onClick: function onClick(evt) {
            evt.stopPropagation();
            props.setModalState('maximized');
          }
        },
        _react2.default.createElement(_WindowIcons.MaximizeIcon, null)
      )
    )
  );
};

var ModalFooter = exports.ModalFooter = function ModalFooter(props) {
  return props.modal === 'minimized' || props.view ? false : _react2.default.createElement(
    'div',
    {
      onClick: function onClick(evt) {
        evt.preventDefault();
        evt.stopPropagation();
      },
      className: props.classes.modalFooter },
    _react2.default.createElement(_ButtonWithInput2.default, props)
  );
};

var createStyles = function createStyles(props) {
  return {
    width: props.modal === 'maximized' ? '100%' : window.innerHeight / window.innerWidth * 90 + 'vw',
    height: props.modal === 'maximized' ? '100%' : '70vh',
    backgroundColor: props.modal === 'minimized' ? 'transparent' : '#F4F9FD',
    boxShadow: props.modal === 'minimized' ? 'none' : '0px 1px 2px 0px rgba(0, 0, 0, 0.14)'
  };
};

var Modal = function Modal(props) {
  return _react2.default.createElement(
    'div',
    { className: props.classes.modalWrapper },
    _react2.default.createElement('div', { className: props.classes.modalOverlay }),
    _react2.default.createElement(
      'div',
      {
        className: props.classes.modal,
        style: createStyles(props)
      },
      props.children
    )
  );
};

Modal.propTypes = {
  classes: _propTypes2.default.object,
  modal: _propTypes2.default.string
};

ModalHeader.propTypes = {
  setModalState: _propTypes2.default.func,
  dispatch: _propTypes2.default.func,
  onClose: _propTypes2.default.func
};

ModalFooter.propTypes = {
  modal: _propTypes2.default.string,
  view: _propTypes2.default.object,
  classes: _propTypes2.default.object
};

exports.default = Modal;