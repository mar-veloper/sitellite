import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/NavBar.css";
import { svg } from "../media/images";

const NavBar = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/home">
            <div className="icon">
              <img src={svg.home} alt="home icon" />
            </div>
            Home
          </NavLink>
        </li>
        <li>
          {" "}
          <NavLink to="/satellites">
            <div className="icon">
              <img src={svg.satellite} alt="satellite icon" />
            </div>
            Satellites
          </NavLink>
        </li>
        <li>
          {" "}
          <NavLink to="/about">
            <div className="icon">
              <img src={svg.about} alt="about icon" />
            </div>
            About
          </NavLink>
        </li>

        <li>
          {" "}
          <NavLink to="/contact">
            <div className="icon">
              <img src={svg.contact} alt="contact icon" />
            </div>
            Contact
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
