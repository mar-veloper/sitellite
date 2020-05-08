import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSpecificSatellite,
  getSpecificSatelliteData,
  getRandomSatelliteImage,
} from "../store/satellites";

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

  console.log(typeof satelliteData.orbit_params);

  return (
    <div>
      <h1>{payload_id}</h1>
      {/* <img src={randomSatImg} alt={payload_id} /> */}
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
            Orbit: <strong>{orbit}</strong>
          </li>
          <li>
            Reference System: <strong>{orbit_params.reference_system}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SpecificSatellite;
