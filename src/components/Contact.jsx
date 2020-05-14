import React, { useState } from "react";
import "../styles/Contact.css";
import Title from "../components/common/PageTitle";

const Contact = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const originalFormValue = { ...formValue };
    const originalErrorMessage = { ...errorMessage };

    Object.keys(formValue).forEach((key) => {
      switch (true) {
        case !formValue[key]:
          setErrorMessage({
            errorMessage,
            [key]: `Please enter ${key}`,
          });
          return;
        case formValue["name"].length < 2:
          setErrorMessage({
            errorMessage,
            ["name"]: "Name required minimum 2 characters.",
          });
          return;

        default:
          setErrorMessage(originalErrorMessage);
          return;
      }
    });
  };

  console.log({ errorMessage });

  const handleChange = (e) => {
    const targetName = e.target.name;
    const targetValue = e.currentTarget.value;

    setFormValue({ ...formValue, [targetName]: targetValue });
  };

  return (
    <div className="container-contact">
      <Title.PageTitle title="Contact" />
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <div
          className="form-error"
          style={
            !errorMessage.name ? { display: "none" } : { display: "block" }
          }
          id="name-error"
        >
          {errorMessage.name && errorMessage.name}
        </div>
        <input
          className="form-input"
          type="text"
          name="name"
          id="name"
          placeholder="Enter name here"
          value={formValue.name}
          onChange={(e) => handleChange(e)}
        />

        <label htmlFor="email" className="form-label">
          Email
        </label>
        <div
          className="form-error"
          style={
            !errorMessage.email ? { display: "none" } : { display: "block" }
          }
          id="name-error"
        >
          {errorMessage.email && errorMessage.email}
        </div>
        <input
          className="form-input"
          type="text"
          name="email"
          id="email"
          placeholder="Enter email here"
          value={formValue.email}
          onChange={(e) => handleChange(e)}
        />

        <label htmlFor="message" className="form-label">
          How can I help you?
        </label>
        <div
          className="form-error"
          style={
            !errorMessage.message ? { display: "none" } : { display: "block" }
          }
          id="name-error"
        >
          {errorMessage.message && errorMessage.message}
        </div>
        <textarea
          type="text"
          name="message"
          id="message"
          className="form-textarea"
          placeholder="Enter message here..."
          value={formValue.message}
          onChange={(e) => handleChange(e)}
        />

        <button>Send</button>
      </form>
      <div className="fadedBottom">
        <span className="scroll-down">Scroll down ↓</span>
      </div>
    </div>
  );
};

export default Contact;
