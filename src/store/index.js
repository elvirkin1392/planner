import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER } from "redux-persist";

import reducer from "./reducer";

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  }),
  devTools: process.env.NODE_ENV !== "production"
});

export const persistor = persistStore(store);
export default store;
