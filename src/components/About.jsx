import React from "react";
import "../styles/About.css";
import Title from "../components/common/PageTitle";

const About = () => {
  return (
    <div className="container-about">
      <Title.PageTitle title="About" />
      <p>
        <a href="https://sitellite.jonmartamon.com/">Sitellite</a> is a
        microsite school project, designed and developed by{" "}
        <a href="https://jonmartamon.com/"> Jonmar Tamon</a>. It intends to
        provide information about satellites that orbits the earth.
      </p>
      <p>
        <a href="https://sitellite.jonmartamon.com/">Sitellite</a> is using{" "}
        <a href="https://github.com/r-spacex/SpaceX-API">Space X API</a> to
        generate satellite payloads.
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
