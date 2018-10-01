import * as redux from 'redux'

const initialState = {
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
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VISIBLE':
      return {
        ...state,
        visible: action.payload
      }
    case 'SET_UPLOADS':
      return {
        ...state,
        uploads: action.payload
      }
    case 'SET_DRAG':
      return {
        ...state,
        drag: action.payload
      }
    case 'SET_WINDOW_CLICK':
      return {
        ...state,
        view: state.view && action.payload ? undefined : state.view,
        windowClick: action.payload
      }
    case 'SET_DIMENSIONS':
      let gridSize = action.payload.width > 568 ? 6 : 1
      let modal = action.payload.width > 568 ? undefined : 'maximized'
      return {
        ...state,
        dimensions: action.payload,
        gridSize: gridSize,
        modal: modal
      }

    case 'SET_MODAL':
      return {
        ...state,
        modal: action.payload
      }
    case 'SET_VIEW':
      return {
        ...state,
        view: action.payload
      }
    default:
      return state
  }
}

export const rootReducer = redux.combineReducers({
  redux: reducer
})

export const store = redux.createStore(
  rootReducer
)
