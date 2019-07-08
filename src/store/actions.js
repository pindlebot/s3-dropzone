import * as actionTypes from './actionTypes'

export const setUploads = (payload) => ({
  payload,
  type: actionTypes.SET_UPLOADS
})

export const setView = (payload) => ({
  payload,
  type: actionTypes.SET_VIEW
})

export const setModal = (payload) => ({
  payload,
  type: actionTypes.SET_MODAL
})

export const setDimensions = (payload) => ({
  payload,
  type: actionTypes.SET_DIMENSIONS
})

export const setDrag = (payload) => ({
  payload,
  type: actionTypes.SET_DRAG
})

export const setVisible = payload => ({
  payload,
  type: actionTypes.SET_VISIBLE
})
