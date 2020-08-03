import { combineReducers } from "redux";

import {
  actions as authActions,
  reducer as authReducer
} from "../services/auth";

const combinedRootReducer = combineReducers({
  auth: authReducer
});

function rootReducer(state, action) {
  if (action.type === authActions.logout.toString()) {
    state = undefined;
    localStorage.removeItem('persist:auth');
  }

  return combinedRootReducer(state, action);
}

export default rootReducer;
