import React from "react";
import "../styles/Loading.css";
import { useSelector } from "react-redux";
import {
  getRandomSatelliteImage,
  getSatellitesImages,
} from "../store/satellites";

const Loading = () => {
  const img = useSelector(getSatellitesImages);

  return (
    <div className="container-loading">
      <div className="ring">
        <div className="satellite">
          <img
            src={img[Math.floor(Math.random() * 10 + 1)]}
            alt="sitellite"
            className="loading-img"
          />
        </div>
        <div className="satellite-2">
          <img
            src={img[Math.floor(Math.random() * 10 + 1)]}
            alt="sitellite"
            className="loading-img"
          />
        </div>
      </div>

      <span className="loading-text">Loading...</span>
    </div>
  );
};

export default Loading;
