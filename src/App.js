import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "./store";
import Routing from "./pages/Routing";
import {FetchProvider} from 'FetchProvider';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
       <FetchProvider>
          <Routing />
        </FetchProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
