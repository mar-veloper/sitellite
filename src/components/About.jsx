import React from "react";
import "../styles/About.css";
import Title from "../components/common/PageTitle";

const About = () => {
  return (
    <div className="container-about">
      <Title.PageTitle title="About" />
      <p>
        <b>Sitellite</b> is a microsite school project, designed and developed
        by <b> Jonmar Tamon</b>. It intends to provide information about
        satellites that orbits the earth.
      </p>
      <p>
        <b>Sitellite</b> is using <b>Space X API</b> to generate satellite
        payloads.
      </p>
      <p className="about-icons">
        Icons made by{" "}
        <a
          href="https://www.flaticon.com/authors/pixel-perfect"
          title="Pixel perfect"
        >
          Pixel perfect
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          {" "}
          www.flaticon.com
        </a>
      </p>
      <div className="fadedBottom">
        <span className="scroll-down">Scroll down ↓</span>
      </div>
    </div>
  );
};

export default About;
