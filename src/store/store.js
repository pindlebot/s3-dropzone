import * as redux from 'redux'
import * as actionTypes from './actionTypes'

const initialState = {
  visible: true,
  uploads: [],
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
    case actionTypes.SET_VISIBLE:
      return {
        ...state,
        visible: action.payload
      }
    case actionTypes.SET_UPLOADS:
      return {
        ...state,
        uploads: action.payload
      }
    case actionTypes.SET_DRAG:
      return {
        ...state,
        drag: action.payload
      }
    case actionTypes.SET_DIMENSIONS:
      let gridSize = action.payload.width > 568 ? 6 : 1
      let modal = action.payload.width > 568 ? undefined : 'maximized'
      return {
        ...state,
        dimensions: action.payload,
        gridSize: gridSize,
        modal: modal
      }
    case actionTypes.SET_MODAL:
      return {
        ...state,
        modal: action.payload
      }
    case actionTypes.SET_VIEW:
      return {
        ...state,
        view: action.payload
      }
    default:
      return state
  }
}

export const rootReducer = redux.combineReducers({
  s3dropzone: reducer
})

export const store = redux.createStore(
  rootReducer
)
