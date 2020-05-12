import React from "react";
import { Provider } from "react-redux";
import { Switch, Route, Redirect, Router } from "react-router-dom";

import "./styles/App.css";

import configureStore from "./store/configureStore";
import Satellites from "./components/Satellites";
import SpecificSatellite from "./components/SpecificSatellite";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import NavBar from "./components/NavBar";
import About from "./components/About";
import Contact from "./components/Contact";

const store = configureStore();

function App() {
  return (
    <div className="container">
      <Provider store={store}>
        <Switch>
          <Route path="/loading" component={Satellites} />
          <Route path="/satellites" exact component={Satellites} />
          <Route path="/satellites/:id" component={SpecificSatellite} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/home" component={Home} />
          <Redirect exact from="/" to="/home" />
          <Route path="/page-not-found" component={PageNotFound} />
          <Redirect to="/page-not-found" />
        </Switch>
        <div className="navBar">
          <NavBar />
        </div>
      </Provider>
    </div>
  );
}

export default App;
