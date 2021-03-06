import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSpecificSatellite,
  getSpecificSatelliteData,
  getRandomSatelliteImage,
} from "../store/satellites";

import "../styles/SpecificSatellite.css";
import Title from "./common/PageTitle";

const SpecificSatellite = ({ match }) => {
  const dispatch = useDispatch();
  const payloadId = match.params.id;

  useEffect(() => {
    dispatch(loadSpecificSatellite(payloadId));
  }, []);

  const satelliteData = useSelector(getSpecificSatelliteData);
  const randomSatImg = useSelector(getRandomSatelliteImage);

  const {
    payload_id,
    customers,
    nationality,
    manufacturer,
    payload_mass_kg,
    orbit,
  } = satelliteData;

  const orbit_params =
    typeof satelliteData.orbit_params === "object" &&
    satelliteData.orbit_params;

  const periapsis = orbit_params && Math.ceil(orbit_params.periapsis_km);
  const apoapsis = orbit_params && Math.ceil(orbit_params.apoapsis_km);
  const inclination = orbit_params && Math.ceil(orbit_params.inclination_deg);
  const satellitePeriod = orbit_params && Math.ceil(orbit_params.period_min);
  const lifespace = orbit_params && Math.ceil(orbit_params.lifespan_years);

  return (
    <div className="container-specificSatellite">
      <div className="column-right">
        <Title.PageTitle title={payload_id} />
        <div className="satellite-img ">
          <img src={randomSatImg} alt={payload_id} />
        </div>
      </div>
      <div className="column-left">
        <ul>
          <li>
            Owner: <strong>{customers}</strong>
          </li>
          <li>
            Nationality: <strong>{nationality}</strong>
          </li>
          <li>
            Manufacturer: <strong>{manufacturer}</strong>
          </li>
        </ul>

        <ul>
          <li>
            Payload mass capacity: <strong>{payload_mass_kg} kg</strong>
          </li>
          <li>
            Lifespan:{" "}
            <strong>
              {lifespace > 1 ? `${lifespace} years` : `${lifespace} year`}
            </strong>
          </li>
          <li>
            Orbit: <strong>{orbit}</strong>
          </li>
          <li>
            Reference System: <strong>{orbit_params.reference_system}</strong>
          </li>
          <li>
            Periapsis: <strong>{periapsis} km</strong>
          </li>
          <li>
            Apoapsis: <strong>{apoapsis} km</strong>
          </li>
          <li>
            Inclination: <strong>{inclination}&#176;</strong>
          </li>
          <li>
            Period: <strong>{satellitePeriod} min</strong>
          </li>
        </ul>
      </div>

      <div className="fadedBottom mobile">
        <span className="scroll-down">Scroll down ↓</span>
      </div>
    </div>
  );
};

export default SpecificSatellite;
