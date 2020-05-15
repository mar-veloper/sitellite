import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSatellites,
  getSatellites,
  getSatelliteManufacturers,
  getSatellitesImages,
} from "../store/satellites";
import "../styles/Satellites.css";
import SatelliteCard from "./SatelliteCard";
import Title from "./common/PageTitle";

const Satellites = ({}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadSatellites());
  }, []);

  const satellites = useSelector(getSatellites);
  const manufacturers = useSelector(getSatelliteManufacturers).sort();
  const satImg = useSelector(getSatellitesImages);

  return (
    <>
      <div className="container-satellites">
        <Title.PageTitle title="Satellites" />
        {manufacturers.map((manufacturer, index) => (
          <div key={index} className="card-container">
            <Title.SectionTitle title={manufacturer} />
            <div key={index} className="card-deck">
              <SatelliteCard
                items={satellites}
                cardDeckTitle={manufacturer}
                img={satImg}
                link={`/satellites`}
              />
            </div>
          </div>
        ))}
        <div className="fadedBottom">
          {" "}
          <span className="scroll-down">Scroll down ↓</span>
        </div>
      </div>
    </>
  );
};

export default Satellites;
