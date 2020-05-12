import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSpecificSatellite,
  getSpecificSatelliteData,
  getRandomSatelliteImage,
} from "../store/satellites";

import "../styles/SpecificSatellite.css";

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

  console.log({ periapsis });
  console.log({ apoapsis });
  console.log({ inclination });
  console.log({ satellitePeriod });

  return (
    <div className="container-specificSatellite">
      <h1>{payload_id}</h1>
      <div className="satellite-img ">
        <img src={randomSatImg} alt={payload_id} />
      </div>
      <div>
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
              {orbit_params.lifespan_years > 1
                ? `${orbit_params.lifespan_years} years`
                : `${orbit_params.lifespan_years} year`}
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

      <div class="gradientback"></div>
    </div>
  );
};

export default SpecificSatellite;
