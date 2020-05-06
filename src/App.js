import React from "react";
import configureStore from "./store/configureStore";

import "./styles/App.css";
import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Satellites from "./components/Satellites";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={Satellites} />
      </Switch>
    </Provider>
  );
}

export default App;
