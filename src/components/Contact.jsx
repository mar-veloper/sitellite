import React, { useState, useEffect } from "react";
import "../styles/Contact.css";
import Title from "../components/common/PageTitle";
import { useDispatch } from "react-redux";
import { validateEmail } from "../helpers/validation";

const Contact = () => {
  const dispatch = useDispatch();

  const [isValidated, setIsValidated] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errorMessage] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const originalFormValue = { ...formValue };
    const newFormValue = {
      name: "",
      email: "",
      message: "",
    };

    try {
      setFormValue(newFormValue);
      dispatch({ type: "success", payload: { message: "Message sent." } });
    } catch (error) {
      setFormValue(originalFormValue);
      dispatch({
        type: "Error",
        payload: { message: "Error sending message." },
      });
    }
  };

  const handleChange = (e) => {
    const targetName = e.target.name;
    const targetValue = e.currentTarget.value;

    setFormValue({ ...formValue, [targetName]: targetValue });

    switch (targetName) {
      case "name":
        switch (true) {
          case !targetValue:
            errorMessage.name = "Please insert a name";
            break;
          case targetValue.length < 2:
            errorMessage.name = "Name requires more than 1 character.";
            break;

          default:
            errorMessage.name = "";
            break;
        }
        break;

      case "email":
        switch (true) {
          case !targetValue:
            errorMessage.email = "Please enter an email.";
            break;
          case targetValue && !validateEmail(targetValue):
            errorMessage.email = "Please enter a valid email.";
            break;
          default:
            errorMessage.email = "";
            break;
        }
        break;

      case "message":
        switch (true) {
          case !targetValue:
            errorMessage.message = "Please insert a message.";
            break;
          case targetValue.length < 10:
            errorMessage.message =
              "Message requires more that 10 or more character.";
            break;

          default:
            errorMessage.message = "";
            break;
        }
        break;

      default:
        setIsValidated(true);
        break;
    }
  };

  useEffect(() => {
    return !errorMessage.name &&
      !errorMessage.email &&
      !errorMessage.message &&
      formValue.message &&
      formValue.name &&
      formValue.email
      ? setIsValidated(true)
      : setIsValidated(false);
  }, [formValue, errorMessage]);

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

        <button className="main-button" disabled={!isValidated}>
          Send
        </button>
      </form>
      <div className="fadedBottom mobile">
        <span className="scroll-down">Scroll down ↓</span>
      </div>
    </div>
  );
};

export default Contact;
