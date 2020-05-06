import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSpecificSatellite } from "../store/satellites";

const SpecificSatellite = ({ match }) => {
  const dispatch = useDispatch();
  const payloadId = match.params.id;

  useEffect(() => {
    dispatch(loadSpecificSatellite(payloadId));
  });

  const selectedSatellite = [
    useSelector((state) => state.satellites.specificSatellite.data),
  ];

  return (
    <div>
      {selectedSatellite.map(
        (
          {
            payload_id,
            customers,
            nationality,
            manufacturer,
            payload_mass_kg,
            orbit,
            orbit_params,
          },
          index
        ) => (
          <div key={index}>
            <h1>{payload_id}</h1>
            <img src="link-here" alt="image here" />
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
                <li>Reference System: {orbit_params.reference_system}</li>
                <li>
                  Nationality: <strong>{nationality}</strong>
                </li>
                <li>
                  Manufacturer: <strong>{manufacturer}</strong>
                </li>
                <li>
                  Manufacturer: <strong>{manufacturer}</strong>
                </li>
              </ul>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default SpecificSatellite;
