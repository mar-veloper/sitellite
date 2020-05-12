import React from "react";
import { Link } from "react-router-dom";

const SatelliteCard = ({ items, cardDeckTitle, img, link }) => {
  return (
    <>
      {items.map(
        ({ manufacturer, payload_id, nationality }, index) =>
          cardDeckTitle === manufacturer && (
            <Link key={index} to={`${link}/${payload_id}`}>
              <div className="card">
                <img
                  src={img[Math.floor(Math.random() * 10 + 1)]}
                  alt={payload_id}
                />
                <p>
                  <span className="satellite-name">{payload_id}</span>
                  <br />
                  <span className="satellite-nationality">{nationality}</span>
                </p>
              </div>
            </Link>
          )
      )}
    </>
  );
};

export default SatelliteCard;
