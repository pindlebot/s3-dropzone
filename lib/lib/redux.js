'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = exports.rootReducer = exports.reducer = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _redux = require('redux');

var redux = _interopRequireWildcard(_redux);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var reducer = exports.reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case 'SET_VISIBLE':
      return (0, _extends3.default)({}, state, {
        visible: action.payload
      });
    case 'SET_UPLOADS':
      return (0, _extends3.default)({}, state, {
        uploads: action.payload
      });
    case 'SET_DRAG':
      return (0, _extends3.default)({}, state, {
        drag: action.payload
      });
    case 'SET_WINDOW_CLICK':
      return (0, _extends3.default)({}, state, {
        view: state.view && action.payload ? undefined : state.view,
        windowClick: action.payload
      });
    case 'SET_DIMENSIONS':
      var gridSize = action.payload.width > 568 ? 6 : 1;
      var modal = action.payload.width > 568 ? undefined : 'maximized';
      return (0, _extends3.default)({}, state, {
        dimensions: action.payload,
        gridSize: gridSize,
        modal: modal
      });

    case 'SET_MODAL':
      return (0, _extends3.default)({}, state, {
        modal: action.payload
      });
    case 'SET_VIEW':
      return (0, _extends3.default)({}, state, {
        view: action.payload
      });
    default:
      return state;
  }
};

var rootReducer = exports.rootReducer = redux.combineReducers({
  redux: reducer
});

var store = exports.store = redux.createStore(rootReducer);