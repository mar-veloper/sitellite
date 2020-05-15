import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles/App.css";
import { getLoadingStatus, endPageloading } from "./store/satellites";

import Satellites from "./components/Satellites";
import SpecificSatellite from "./components/SpecificSatellite";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import NavBar from "./components/NavBar";
import About from "./components/About";
import Contact from "./components/Contact";
import Loading from "./components/Loading";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoadingStatus);
  useEffect(() => {
    setTimeout(() => {
      dispatch(endPageloading);
    }, 2000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container">
          <ToastContainer
            position="top-center"
            autoClose={5000}
            closeOnClick
            draggable
            pauseOnHover
          />
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
        </div>
      )}
    </>
  );
}

export default App;
