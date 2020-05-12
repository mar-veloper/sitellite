import React from "react";
import { NavLink } from "react-router-dom";
import { svg } from "../img/images";

import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/home">
            <div className="icon">
              <img src={svg.home} alt="hello" />
            </div>
            Home
          </NavLink>
        </li>
        <li>
          {" "}
          <NavLink to="/satellites">
            <div className="icon">
              <img src={svg.satellite} alt="hello" />
            </div>
            Satellites
          </NavLink>
        </li>
        <li>
          {" "}
          <NavLink to="/about">
            <div className="icon">
              <img src={svg.about} alt="hello" />
            </div>
            About
          </NavLink>
        </li>

        <li>
          {" "}
          <NavLink to="/contact">
            <div className="icon">
              <img src={svg.contact} alt="hello" />
            </div>
            Contact
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
