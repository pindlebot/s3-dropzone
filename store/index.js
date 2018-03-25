const createStore = (initialState) => {
  let state = initialState || {}
  const listeners = {}

  const subscribe = (key, callback) => {
    listeners[key] = listeners[key] || []
    listeners[key].push(callback)
  }

  const unsubscribe = (key, callback) => {
    listeners[key] = listeners[key].filter((listener) => listener !== callback)
  }

  const update = (key, item) => {
    state = {
      ...state,
      [key]: item
    }
    if (listeners[key]) {
      listeners[key].forEach((listener) => listener(state[key]))
    }
  }

  const get = (key) => state[key]

  return {
    subscribe,
    unsubscribe,
    update,
    get
  }
}

export default createStore
