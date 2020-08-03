import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const getModuleState = state => state.auth;

export const selectors = {
  isAuthenticated(state) {
    const { isAuthenticated } = getModuleState(state);
    return isAuthenticated;
  },
  getAccessToken(state) {
    const { accessToken } = getModuleState(state);
    return accessToken;
  },
  getUserProfile(state) {
    const { userProfile } = getModuleState(state);
    return userProfile;
  }
};

const slice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    accessToken: null,
    userProfile: {}
  },
  reducers: {
    login(state, { payload }) {
      const { email, userProfile, accessToken } = payload;

      state.isAuthenticated = true;
      state.accessToken = accessToken;
      state.userProfile = userProfile;
      state.userProfile.email = email;
    },
    logout() {
      // just to generate action creator, see rootReducer - it resets the whole state
    }
  }
});

export const actions = slice.actions;
export const reducer = persistReducer(
  {
    key: "auth",
    storage
  },
  slice.reducer
);
