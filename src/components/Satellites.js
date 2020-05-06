import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSatellites,
  getSatellites,
  getSatellitesManufacturers,
} from "../store/satellites";

const Satellites = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSatellites());
  }, []);

  const satellites = useSelector(getSatellites);

  const manufacturers = useSelector(getSatellitesManufacturers).sort();
  console.log(manufacturers);

  return (
    <div>
      <h1>Satellites</h1>
    </div>
  );
};

export default Satellites;
