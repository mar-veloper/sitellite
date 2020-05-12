import React from "react";

const PageTitle = ({ title }) => (
  <>
    <h2 className="page-title">{title}</h2>
  </>
);

const SectionTitle = ({ title }) => (
  <>
    <h2 className="section-title">{title}</h2>
  </>
);

const Title = {
  PageTitle,
  SectionTitle,
};

export default Title;
