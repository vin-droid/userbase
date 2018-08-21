import { UPDATE_TOASTER } from '../constants';
const initialState = {
    toasterOpts: {}
}

export function shared(state = initialState, action) {
  // For now, don't handle any actions
  // and just return the state given to us.
  switch (action.type) {
      case UPDATE_TOASTER:
        return Object.assign({},state,{
          toasterOpts: action.toasterOpts
        })
      default:
        return state
    }
  return state
}