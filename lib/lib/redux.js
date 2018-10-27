"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = exports.rootReducer = exports.reducer = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var redux = _interopRequireWildcard(require("redux"));

var initialState = {
  visible: true,
  uploads: [],
  windowClick: false,
  drag: false,
  gridSize: 6,
  modal: undefined,
  view: undefined,
  dimensions: {
    width: window.innerWidth,
    height: window.innerHeight
  }
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_VISIBLE':
      return (0, _objectSpread2.default)({}, state, {
        visible: action.payload
      });

    case 'SET_UPLOADS':
      return (0, _objectSpread2.default)({}, state, {
        uploads: action.payload
      });

    case 'SET_DRAG':
      return (0, _objectSpread2.default)({}, state, {
        drag: action.payload
      });

    case 'SET_WINDOW_CLICK':
      return (0, _objectSpread2.default)({}, state, {
        view: state.view && action.payload ? undefined : state.view,
        windowClick: action.payload
      });

    case 'SET_DIMENSIONS':
      var gridSize = action.payload.width > 568 ? 6 : 1;
      var modal = action.payload.width > 568 ? undefined : 'maximized';
      return (0, _objectSpread2.default)({}, state, {
        dimensions: action.payload,
        gridSize: gridSize,
        modal: modal
      });

    case 'SET_MODAL':
      return (0, _objectSpread2.default)({}, state, {
        modal: action.payload
      });

    case 'SET_VIEW':
      return (0, _objectSpread2.default)({}, state, {
        view: action.payload
      });

    default:
      return state;
  }
};

exports.reducer = reducer;
var rootReducer = redux.combineReducers({
  redux: reducer
});
exports.rootReducer = rootReducer;
var store = redux.createStore(rootReducer);
exports.store = store;