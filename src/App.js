import React from "react";
import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";

import "./styles/App.css";
import configureStore from "./store/configureStore";
import Satellites from "./components/Satellites";
import SpecificSatellite from "./components/SpecificSatellite";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Switch>
        <Route exact path="/satellites" component={Satellites} />
        <Route exact path="/satellites/:id" component={SpecificSatellite} />
      </Switch>
    </Provider>
  );
}

export default App;
