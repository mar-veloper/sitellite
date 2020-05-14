import React from "react";

import "../styles/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container-home">
      <h1>Sitellite</h1>
      <p>We provide information about satellites that orbits the earth.</p>

      <Link to="/satellites">
        {" "}
        <button className="main-button">See satellites</button>
      </Link>
    </div>
  );
};

export default Home;
