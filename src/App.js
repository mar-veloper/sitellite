import React from "react";
import { Provider } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import "./styles/App.css";
import configureStore from "./store/configureStore";
import Satellites from "./components/Satellites";
import SpecificSatellite from "./components/SpecificSatellite";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Switch>
        <Route path="/loading" component={Satellites} />
        <Route exact path="/" component={Home} />
        <Route exact path="/satellites" component={Satellites} />
        <Route path="/satellites/:id" component={SpecificSatellite} />
        <Route path="/page-not-found" component={PageNotFound} />
        <Redirect to="/page-not-found" />
      </Switch>
    </Provider>
  );
}

export default App;
