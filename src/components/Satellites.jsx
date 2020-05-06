import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSatellites,
  getSatellites,
  getSatelliteManufacturers,
} from "../store/satellites";
import { Link } from "react-router-dom";

const Satellites = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSatellites());
  }, []);

  const satellites = useSelector(getSatellites);
  const manufacturers = useSelector(getSatelliteManufacturers).sort();

  return (
    <div>
      {manufacturers.map((manufacturer, index) => (
        <div key={index}>
          <h3>{manufacturer}</h3>
          <div>
            {satellites.map(
              (
                { manufacturer: currentManufacturer, payload_id, nationality },
                index
              ) =>
                manufacturer === currentManufacturer && (
                  <Link key={index} to={`/satellites/${payload_id}`}>
                    <div style={sample}>
                      <p>{payload_id}</p>
                      <p>{nationality}</p>
                    </div>
                  </Link>
                )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const sample = {
  marginBottom: "30px",
};

export default Satellites;
